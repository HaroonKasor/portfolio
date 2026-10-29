"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, MoveHorizontal, Minus, Plus } from "lucide-react";
import type { PDFDocumentLoadingTask, PDFDocumentProxy, RenderTask } from "pdfjs-dist";

import { cn } from "@/lib/utils";

type Status = "loading" | "ready" | "error";

/** Zoom is relative to "fit width"; 1 = page fills the scroll area. */
const ZOOM_STEPS = [0.75, 1, 1.25, 1.5, 1.75, 2, 2.5];
const FIT = 1;
const RERENDER_DELAY_MS = 150;
/** Canvases beyond this many backing pixels fail or crash on iOS Safari. */
const MAX_BACKING_PIXELS = 24_000_000;

type Loaded = {
  doc: PDFDocumentProxy;
  canvases: HTMLCanvasElement[];
  /** Page 1 size in PDF points; every placeholder is sized from it. */
  baseWidth: number;
  baseHeight: number;
  tasks: Map<HTMLCanvasElement, RenderTask>;
};

/** Content-box width of the scroll area: the width a page can actually use. */
function availableWidth(el: HTMLElement) {
  const style = getComputedStyle(el);
  const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  return Math.max(0, Math.floor(el.clientWidth - padding));
}

function sizeCanvases(canvases: HTMLCanvasElement[], width: number, height: number) {
  for (const canvas of canvases) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }
}

const toolButton =
  "hit-area border-line text-text hover:bg-bg inline-flex size-9 items-center justify-center rounded-full border transition-colors disabled:opacity-40 disabled:hover:bg-transparent";

/**
 * Renders a PDF as a column of A4-like pages on our own canvas, so the viewer
 * matches the design instead of inheriting the browser's PDF toolbar and
 * dark chrome. Falls back to a plain <iframe> when pdf.js cannot load.
 */
export function PdfViewer({
  src,
  title,
  loadingLabel,
  className,
}: {
  src: string;
  title: string;
  loadingLabel: string;
  /** Spacing/background of the scroll area; differs between modal and sheet. */
  className?: string;
}) {
  const t = useTranslations("cv");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef<Loaded | null>(null);
  const prevWidthRef = useRef(0);
  const [status, setStatus] = useState<Status>("loading");
  const [loaded, setLoaded] = useState(false);
  const [zoom, setZoom] = useState(FIT);
  const [avail, setAvail] = useState(0);

  const hasScroll = status !== "error";

  // Track the scroll area's width so fit mode re-fits on resize/rotation.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    setAvail(availableWidth(el));
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => setAvail(availableWidth(el)), RERENDER_DELAY_MS);
    });
    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [hasScroll]);

  // Load the document and create one placeholder canvas per page.
  useEffect(() => {
    let cancelled = false;
    let task: PDFDocumentLoadingTask | undefined;
    const host = pagesRef.current;
    if (!host) return;
    host.replaceChildren();
    setStatus("loading");
    setLoaded(false);

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        // Closed while the chunk was loading: never start a worker nobody will destroy.
        if (cancelled) return;
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        task = pdfjs.getDocument({ url: src });
        const doc = await task.promise;
        if (cancelled) return;

        const first = await doc.getPage(1);
        if (cancelled) return;
        const base = first.getViewport({ scale: 1 });

        const canvases: HTMLCanvasElement[] = [];
        for (let i = 1; i <= doc.numPages; i++) {
          const canvas = document.createElement("canvas");
          canvas.dataset.page = String(i);
          canvas.className =
            "block rounded-[4px] border border-line bg-white shadow-[var(--shadow-page)]";
          canvas.setAttribute("role", "img");
          canvas.setAttribute(
            "aria-label",
            t("page", { title, current: i, total: doc.numPages }),
          );
          host.appendChild(canvas);
          canvases.push(canvas);
        }
        loadedRef.current = {
          doc,
          canvases,
          baseWidth: base.width,
          baseHeight: base.height,
          tasks: new Map(),
        };
        setLoaded(true);
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      const current = loadedRef.current;
      loadedRef.current = null;
      prevWidthRef.current = 0;
      current?.tasks.forEach((render) => render.cancel());
      void task?.destroy();
    };
  }, [src, title, t]);

  // Size the pages for the current zoom and rasterise the ones in view.
  // Placeholder sizes change immediately (the old bitmap stretches for a
  // moment); the canvas is re-rasterised after a short debounce so rapid
  // +/- clicks do not queue a render per click.
  useEffect(() => {
    const state = loadedRef.current;
    const scroll = scrollRef.current;
    if (!loaded || !state || !scroll || avail <= 0) return;
    const { doc, canvases, baseWidth, baseHeight, tasks } = state;

    const pageWidth = Math.round(avail * zoom);
    const cssScale = pageWidth / baseWidth;
    const pageHeight = Math.round(baseHeight * cssScale);
    const dprWanted = Math.min(Math.max(window.devicePixelRatio || 1, 2), 3);
    const dpr = Math.max(
      1.5,
      Math.min(dprWanted, Math.sqrt(MAX_BACKING_PIXELS / (pageWidth * pageHeight))),
    );

    sizeCanvases(canvases, pageWidth, pageHeight);
    if (pagesRef.current) pagesRef.current.style.width = `${pageWidth}px`;

    // Keep the point under the centre of the view in place while zooming.
    const prev = prevWidthRef.current;
    if (prev > 0 && prev !== pageWidth) {
      const ratio = pageWidth / prev;
      scroll.scrollTop = (scroll.scrollTop + scroll.clientHeight / 2) * ratio - scroll.clientHeight / 2;
      scroll.scrollLeft = (scroll.scrollLeft + scroll.clientWidth / 2) * ratio - scroll.clientWidth / 2;
    }
    prevWidthRef.current = pageWidth;

    let cancelled = false;
    let lazy: IntersectionObserver | undefined;
    const rendered = new Set<number>();

    const renderPage = async (canvas: HTMLCanvasElement) => {
      const n = Number(canvas.dataset.page);
      if (rendered.has(n)) return;
      rendered.add(n);
      const page = await doc.getPage(n);
      if (cancelled) return;
      const viewport = page.getViewport({
        scale: pageWidth / page.getViewport({ scale: 1 }).width,
      });
      // A cancelled render still holds its canvas until it settles.
      const previous = tasks.get(canvas);
      if (previous) {
        previous.cancel();
        await previous.promise.catch(() => {});
        if (cancelled) return;
      }
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const render = page.render({
        canvas,
        canvasContext: ctx,
        viewport,
        transform: [dpr, 0, 0, dpr, 0, 0],
      });
      tasks.set(canvas, render);
      try {
        await render.promise;
      } catch (error) {
        // Cleanup cancels in-flight renders; that rejection is expected.
        if (!cancelled) throw error;
      } finally {
        if (tasks.get(canvas) === render) tasks.delete(canvas);
      }
    };

    const timer = setTimeout(
      async () => {
        try {
          // First page first so "ready" means something is visible.
          await renderPage(canvases[0]);
          if (cancelled) return;
          setStatus("ready");
          lazy = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                lazy?.unobserve(entry.target);
                renderPage(entry.target as HTMLCanvasElement).catch(() => {
                  // A page that cannot rasterise would stay blank; fall back to the browser viewer.
                  if (!cancelled) setStatus("error");
                });
              }
            },
            { root: scroll, rootMargin: "1200px 0px" },
          );
          canvases.slice(1).forEach((c) => lazy?.observe(c));
        } catch {
          if (!cancelled) setStatus("error");
        }
      },
      // The very first render should not wait.
      status === "loading" ? 0 : RERENDER_DELAY_MS,
    );

    return () => {
      cancelled = true;
      clearTimeout(timer);
      lazy?.disconnect();
      tasks.forEach((render) => render.cancel());
    };
    // `status` only picks the initial delay; re-running on it would restart renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, avail, zoom]);

  const stepIndex = ZOOM_STEPS.indexOf(zoom);
  const zoomBy = (delta: number) => {
    const next = ZOOM_STEPS[Math.min(Math.max(stepIndex + delta, 0), ZOOM_STEPS.length - 1)];
    setZoom(next);
  };
  const fitWidth = () => {
    setZoom(FIT);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  };

  if (status === "error") {
    return (
      <iframe
        src={`${src}#toolbar=0&navpanes=0`}
        title={title}
        tabIndex={-1}
        data-pdf-src={src}
        className={cn("min-h-0 w-full flex-1 border-0", className)}
      />
    );
  }

  return (
    <>
      <div
        role="toolbar"
        aria-label={t("pages")}
        className="sm:border-line flex shrink-0 items-center justify-between gap-2 py-2 sm:border-b sm:px-6"
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={t("zoomOut")}
            disabled={stepIndex <= 0}
            onClick={() => zoomBy(-1)}
            className={toolButton}
          >
            <Minus className="size-4" aria-hidden />
          </button>
          <span
            aria-live="polite"
            aria-label={t("zoomLevel", { percent: Math.round(zoom * 100) })}
            className="text-text min-w-11 text-center text-[13px] leading-none font-medium tabular-nums"
          >
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label={t("zoomIn")}
            disabled={stepIndex >= ZOOM_STEPS.length - 1}
            onClick={() => zoomBy(1)}
            className={toolButton}
          >
            <Plus className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={t("fitWidth")}
            aria-pressed={zoom === FIT}
            onClick={fitWidth}
            className={cn(toolButton, "sm:w-auto sm:gap-2 sm:px-3.5 sm:text-[13px]")}
          >
            <MoveHorizontal className="size-4" aria-hidden />
            <span className="max-sm:hidden">{t("fitWidth")}</span>
          </button>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("openFull")}
          className={cn(toolButton, "sm:w-auto sm:gap-2 sm:px-3.5 sm:text-[13px]")}
        >
          <ExternalLink className="size-4" aria-hidden />
          <span className="max-sm:hidden">{t("openFull")}</span>
        </a>
      </div>
      <div
        ref={scrollRef}
        data-pdf-src={src}
        data-status={status}
        data-zoom={zoom}
        role="region"
        aria-label={t("pages")}
        tabIndex={0}
        className={cn("min-h-0 flex-1 overflow-auto overscroll-contain", className)}
      >
        <div
          ref={pagesRef}
          style={{ width: avail > 0 ? Math.round(avail * zoom) : undefined }}
          className="mx-auto flex flex-col gap-6"
        />
        {status === "loading" && (
          <div
            role="status"
            aria-label={loadingLabel}
            className="border-line mx-auto w-full max-w-[560px] rounded-[4px] border bg-surface p-10 shadow-[var(--shadow-page)]"
          >
            <div className="skeleton mb-4 h-6 w-40 rounded" />
            <div className="skeleton mb-8 h-3 w-72 rounded" />
            {[95, 80, 88, 0, 30, 100, 0, 60, 92, 84, 96, 78, 90, 86, 70].map((w, i) => (
              <div
                key={i}
                className="skeleton mb-3 h-2 rounded"
                style={{ width: `${w}%`, opacity: w ? 1 : 0 }}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
