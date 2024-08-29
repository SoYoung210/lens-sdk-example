import React, { useCallback, useRef, useEffect } from 'react';

type Ref<T> = React.RefObject<T> | React.MutableRefObject<T> | React.Ref<T>;

export function useCombinedRefs<T>(...refs: Ref<T>[]) {
  const targetRef = useRef<T | null>(null);

  const combinedRef = useCallback(
    (node: T | null) => {
      targetRef.current = node;

      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === 'function') {
          ref(node);
        } else {
          (ref as React.MutableRefObject<T | null>).current = node;
        }
      });
    },
    [refs]
  );

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref || typeof ref !== 'object') return;

      const mutableRef = ref as React.MutableRefObject<T | null>;
      if (mutableRef.current !== targetRef.current) {
        mutableRef.current = targetRef.current;
      }
    });
  }, [refs]);

  return combinedRef;
}
