import { useLayoutEffect, useRef } from "react";

function useMobileVhFix() {
  const height = useRef(0);
  useLayoutEffect(() => {
    const handleResize = (e) => {
      const newHeight = window?.innerHeight;
      const isMobile = window?.innerWidth < 960;
      if (!isMobile || !newHeight || newHeight === height.current) return;
      document.querySelectorAll(".fill-vh").forEach((el) => {
        el.style.height = `${window?.innerHeight}px`;
      });
    };
    window?.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window?.removeEventListener("resize", handleResize);
    };
  });
}

export default useMobileVhFix;
