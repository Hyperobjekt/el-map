import React from "react";
import clsx from "clsx";

const ArrowUp = ({ className, ...props }) => {
  return (
    <svg className={clsx("icon", className)} viewBox="0 0 22 14" {...props}>
      <polygon points="18.8743237 14 10.7824379 6.58305074 3.2339044 13.9494508 0 10.4250495 10.6828079 0 22 10.3732359"></polygon>
    </svg>
  );
};

export default ArrowUp;
