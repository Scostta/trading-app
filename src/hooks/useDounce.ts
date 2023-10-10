import { useState, useEffect } from 'react'

const DEFAULT_TIMER = 500

export const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, DEFAULT_TIMER);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};