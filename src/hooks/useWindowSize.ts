import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    const debouncedHandleResize = debounce(handleResize, 50);
    window.addEventListener("resize", debouncedHandleResize);
    handleResize;
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);
  return windowSize;
};
