import { useCallback, useState } from 'react';

export const useUpdate = (initial = 0): [number, () => void] => {
  const [key, setKey] = useState(initial);
  const refresh = useCallback(() => setKey((prev) => prev + 1), []);

  return [key, refresh];
};
