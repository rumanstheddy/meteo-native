import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number = 500) => {
  const [debouncedText, setDebouncedText] = useState<string>("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedText(value);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedText;
};

export { useDebounce };
