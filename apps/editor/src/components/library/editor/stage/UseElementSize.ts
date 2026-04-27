import { useCallback, useRef, useState } from "react";
import type { RefCallback } from "react";

interface ElementSize {
  width: number;
  height: number;
}

export function useElementSize(): [RefCallback<HTMLElement>, ElementSize] {
  const observerRef = useRef<ResizeObserver | null>(null);
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  const ref: RefCallback<HTMLElement> = useCallback((element: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!element) return;

    observerRef.current = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observerRef.current.observe(element);
    const rect = element.getBoundingClientRect();
    setSize({ width: rect.width, height: rect.height });
  }, []);

  return [ref, size];
}
