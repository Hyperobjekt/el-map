import React from "react";
import clsx from "clsx";

const Close = ({ className, ...props }) => {
  return (
    <svg className={clsx("icon", className)} viewBox="0 0 20 20" {...props}>
      <polygon points="12.8571429 10 20 17.1428571 17.1428571 20 10 12.8571429 2.85714286 20 0 17.1428571 7.14285714 10 0 2.85714286 2.85714286 0 10 7.14285714 17.1428571 0 20 2.85714286"></polygon>
    </svg>
  );
};

export default Close;
