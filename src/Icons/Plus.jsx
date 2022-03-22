import React from "react";
import clsx from "clsx";

const Plus = ({ className, ...props }) => {
  return (
    <svg className={clsx("icon", className)} viewBox="0 0 22 22" {...props}>
      <path d="M8,8 L8,0 L13.6900001,0 L13.6900001,8 L22,8 L22,13.6700001 L13.6900001,13.6700001 L13.6900001,22 L8,22 L8,13.6700001 L0,13.6700001 L0,8 L8,8 Z"></path>
    </svg>
  );
};

export default Plus;
