"use client";

import { useEffect, useRef, useState } from "react";

type Status = "loading" | "ready" | "error";

/**
 * Renders a PDF as a column of A4-like pages on our own canvas, so the viewer
 * matches the design instead of inheriting the browser's PDF toolbar and
 * dark chrome. Falls back to a plain <iframe> when pdf.js cannot load.
 */
export function PdfViewer({
  src,
  title,
  onPages,
  onPageChange,
  loadingLabel,
}: {
  src: string;
  title: string;
  onPages?: (total: number) => void;
  onPageChange?: (current: number) => void;
  loadingLabel: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;
    const host = pagesRef.current;
    if (!host) return;
    host.replaceChildren();
    setStatus("loading");

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const doc = await pdfjs.getDocument({ url: src }).promise;
        if (cancelled) return;
        onPages?.(doc.numPages);

        const width = Math.min(host.clientWidth, 720);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          if (cancelled) return;
          const base = page.getViewport({ scale: 1 });
          const scale = width / base.width;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${viewport.width}px`;
          canvas.style.height = `${viewport.height}px`;
          canvas.dataset.page = String(i);
          canvas.className =
            "bg-white block rounded-[4px] shadow-[0_4px_16px_rgba(0,0,0,0.12)]";
          canvas.setAttribute("role", "img");
          canvas.setAttribute("aria-label", `${title} — ${i}/${doc.numPages}`);
          host.appendChild(canvas);

          const ctx = canvas.getContext("2d");
          if (!ctx) continue;
          await page.render({
            canvas,
            canvasContext: ctx,
            viewport,
            transform: dpr === 1 ? undefined : [dpr, 0, 0, dpr, 0, 0],
          }).promise;
        }
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [src, title, onPages]);

  // Report the page that occupies most of the viewport for the footer counter.
  useEffect(() => {
    if (status !== "ready" || !onPageChange) return;
    const root = scrollRef.current;
    const host = pagesRef.current;
    if (!root || !host) return;
    const canvases = [...host.querySelectorAll<HTMLCanvasElement>("canvas")];
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best) onPageChange(Number((best.target as HTMLElement).dataset.page));
      },
      { root, threshold: [0.25, 0.5, 0.75] },
    );
    canvases.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [status, onPageChange]);

  if (status === "error") {
    return (
      <iframe
        src={`${src}#toolbar=0&navpanes=0`}
        title={title}
        tabIndex={-1}
        data-pdf-src={src}
        className="bg-accent-soft min-h-0 w-full flex-1 border-0"
      />
    );
  }

  return (
    <div
      ref={scrollRef}
      data-pdf-src={src}
      data-status={status}
      className="bg-accent-soft min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8"
    >
      <div ref={pagesRef} className="mx-auto flex w-full max-w-[720px] flex-col gap-6" />
      {status === "loading" && (
        <div
          role="status"
          aria-label={loadingLabel}
          className="mx-auto w-full max-w-[720px] rounded-[4px] bg-white p-10 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
        >
          <div className="bg-line/70 mb-4 h-6 w-40 rounded" />
          <div className="bg-line/50 mb-8 h-3 w-72 rounded" />
          {[95, 80, 88, 0, 30, 100, 0, 60, 92, 84, 96, 78, 90, 86, 70].map((w, i) => (
            <div
              key={i}
              className="bg-line/50 mb-3 h-2 rounded"
              style={{ width: `${w}%`, opacity: w ? 1 : 0 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
