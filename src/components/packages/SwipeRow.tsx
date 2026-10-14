"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props = { className: string; label: string; children: React.ReactNode };

/**
 * Horizontal card carousel: a scroll-snap track (native touch/trackpad swipe),
 * mouse drag on desktop, prev/next arrows and one dot per reachable position.
 */
export default function SwipeRow({ className, label, children }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [index, setIndex] = useState(0);
  const [positions, setPositions] = useState(1);

  const step = useCallback(() => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 1;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    return first.offsetWidth + gap;
  }, []);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const s = step();
    setPositions(Math.max(1, Math.round((el.scrollWidth - el.clientWidth) / s) + 1));
    setIndex(Math.round(el.scrollLeft / s));
  }, [step]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    return () => ro.disconnect();
  }, [measure]);

  const goTo = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: Math.max(0, Math.min(i, positions - 1)) * step(), behavior: "smooth" });
  };

  // Mouse drag-to-scroll; touch and trackpads already scroll natively.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = e.currentTarget;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
    el.classList.add("is-dragging");
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 5) d.moved = true;
    e.currentTarget.scrollLeft = d.left - dx;
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    e.currentTarget.classList.remove("is-dragging");
    // Settle on the nearest card, then keep the drag from counting as a click.
    goTo(Math.round(e.currentTarget.scrollLeft / step()));
    if (d.moved) {
      const stop = (ev: Event) => {
        ev.stopPropagation();
        ev.preventDefault();
      };
      e.currentTarget.addEventListener("click", stop, { capture: true, once: true });
      setTimeout(() => track.current?.removeEventListener("click", stop, { capture: true }), 0);
    }
  };

  const prev = (
    <button type="button" className="sr-swipe-arrow sr-swipe-arrow--prev" aria-label="Previous" disabled={index <= 0} onClick={() => goTo(index - 1)}>
      <FiChevronLeft aria-hidden="true" />
    </button>
  );
  const next = (
    <button type="button" className="sr-swipe-arrow sr-swipe-arrow--next" aria-label="Next" disabled={index >= positions - 1} onClick={() => goTo(index + 1)}>
      <FiChevronRight aria-hidden="true" />
    </button>
  );

  return (
    <div className="sr-swipe" role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="sr-swipe-stage">
        <div
          ref={track}
          className={className}
          onScroll={e => setIndex(Math.round(e.currentTarget.scrollLeft / step()))}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {children}
        </div>
        {positions > 1 && (
          <>
            {prev}
            {next}
          </>
        )}
      </div>

      {positions > 1 && (
        <div className="sr-swipe-dots">
          {Array.from({ length: positions }, (_, i) => (
            <button
              key={i}
              type="button"
              className={i === index ? "is-active" : undefined}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
