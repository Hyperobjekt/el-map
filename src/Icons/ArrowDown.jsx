import React from "react";
import clsx from "clsx";

const ArrowDown = ({ className, ...props }) => {
  return (
    <svg className={clsx("icon", className)} viewBox="0 0 22 14" {...props}>
      <polygon points="18.8743237 0 22 3.62676411 10.6828079 14 0 3.57495046 3.2339044 0.0505492411 10.7824379 7.41694926"></polygon>
    </svg>
  );
};

export default ArrowDown;
