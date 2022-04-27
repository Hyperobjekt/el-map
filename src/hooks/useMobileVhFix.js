import { useLayoutEffect, useRef } from "react";

/**
 * Sets the height on the provided element ref to the height of the window.
 * This is used instead of 100vh, because 100vh exceeds the height of the
 * viewport when the navigation bar is visible.
 * @param {React.Ref} elRef reference for an element
 * @returns {void}
 */
function useMobileVhFix(elRef) {
  if (!elRef) return;
  const height = useRef(0);
  useLayoutEffect(() => {
    const handleResize = (e) => {
      const newHeight = window?.innerHeight;
      if (!elRef.current || !newHeight || newHeight === height.current) return;
      elRef.current.style.height = `${window?.innerHeight}px`;
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
