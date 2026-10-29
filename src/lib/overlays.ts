/** Shared bookkeeping for stacked overlays (menu sheet, CV dialog, zoom). */

let locks = 0;
let saved = '';

/** Ref-counted body scroll lock: overflow is restored only when the last
 * overlay releases it. Returns an idempotent unlock function. */
export function lockScroll(): () => void {
  if (locks++ === 0) {
    saved = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0) document.body.style.overflow = saved;
  };
}

type Entry = { onResume?: () => void };
const stack: Entry[] = [];

/** Registers an overlay on the stack so only the top-most one reacts to
 * Escape. `onResume` runs when everything above it has closed. */
export function pushOverlay(onResume?: () => void) {
  const entry: Entry = { onResume };
  stack.push(entry);
  return {
    isTop: () => stack[stack.length - 1] === entry,
    pop: () => {
      const index = stack.indexOf(entry);
      if (index === -1) return;
      const wasTop = index === stack.length - 1;
      stack.splice(index, 1);
      if (wasTop) stack[stack.length - 1]?.onResume?.();
    },
  };
}
