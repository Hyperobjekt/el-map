import { useLayoutEffect, useRef } from "react";

function useMobileVhFix(el) {
  if (!el) return;
  const height = useRef(0);
  useLayoutEffect(() => {
    const handleResize = (e) => {
      const newHeight = window?.innerHeight;
      const isMobile = window?.innerWidth < 960;
      if (
        !el.current ||
        !isMobile ||
        !newHeight ||
        newHeight === height.current
      )
        return;
      el.current.style.height = `${window?.innerHeight}px`;
      height.current = newHeight;
    };
    window?.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  });
}

export default useMobileVhFix;
