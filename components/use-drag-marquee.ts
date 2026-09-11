"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";

/**
 * Ruban défilant que l'on peut attraper. Le déplacement est calculé en
 * JavaScript, image par image, plutôt qu'en CSS : c'est ce qui permet de
 * prendre la piste à la souris ou au doigt, de la tirer dans les deux sens,
 * puis de la laisser repartir exactement d'où on l'a lâchée.
 *
 * La piste contient deux copies identiques ; la position est ramenée modulo
 * la largeur d'une copie, donc la boucle est infinie dans les deux sens sans
 * jamais se voir. Le survol suspend le défilement ; en mouvement réduit il ne
 * démarre pas, et seul le glissé fait bouger le ruban.
 */
export function useDragMarquee({ speed = 40 }: { speed?: number } = {}): {
  trackRef: RefObject<HTMLDivElement | null>;
  firstRef: RefObject<HTMLDivElement | null>;
  dragging: boolean;
  viewportProps: {
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClickCapture: (e: React.MouseEvent<HTMLDivElement>) => void;
  };
} {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstRef = useRef<HTMLDivElement | null>(null);
  const state = useRef({
    offset: 0,
    hovered: false,
    drag: null as { x: number; offset: number } | null,
    dragged: false,
  });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      const s = state.current;
      const width = firstRef.current?.offsetWidth ?? 0;
      if (width > 0 && trackRef.current) {
        if (!s.drag && !s.hovered && !reduce) s.offset += speed * dt;
        s.offset = ((s.offset % width) + width) % width;
        trackRef.current.style.transform = `translate3d(${-s.offset}px, 0, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: globalThis.PointerEvent) => {
      const s = state.current;
      if (!s.drag) return;
      const dx = e.clientX - s.drag.x;
      if (Math.abs(dx) > 6) s.dragged = true;
      s.offset = s.drag.offset - dx;
    };
    const up = () => {
      state.current.drag = null;
      setDragging(false);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [dragging]);

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const s = state.current;
    s.drag = { x: e.clientX, offset: s.offset };
    s.dragged = false;
    setDragging(true);
  }, []);

  return {
    trackRef,
    firstRef,
    dragging,
    viewportProps: {
      onPointerDown,
      onMouseEnter: () => {
        state.current.hovered = true;
      },
      onMouseLeave: () => {
        state.current.hovered = false;
      },
      // Un glissé qui finit sur un lien n'est pas un clic.
      onClickCapture: (e) => {
        if (state.current.dragged) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
    },
  };
}
