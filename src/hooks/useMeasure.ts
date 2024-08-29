import { useCallback, useRef, useState } from 'react';

interface Dimensions {
  width: number | undefined;
  height: number | undefined;
}

type MeasureRef = (node: HTMLElement | null) => void;

export function useMeasure(): [MeasureRef, Dimensions] {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: undefined,
    height: undefined,
  });

  const previousObserver = useRef<ResizeObserver | null>(null);

  const customRef = useCallback((node: HTMLElement | null) => {
    if (previousObserver.current) {
      previousObserver.current.disconnect();
      previousObserver.current = null;
    }

    if (node?.nodeType === Node.ELEMENT_NODE) {
      const observer = new ResizeObserver(([entry]) => {
        if (entry && entry.borderBoxSize) {
          const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];

          setDimensions({ width, height });
        }
      });

      observer.observe(node);
      previousObserver.current = observer;
    }
  }, []);

  return [customRef, dimensions];
}
