import React from "react";
import clsx from "clsx";

const Facebook = ({ className, ...props }) => {
  return (
    <svg className={clsx("icon", className)} viewBox="0 0 10 20" {...props}>
      <path d="M10,0 L10,4 L8,4 C7.31,4 7,4.81 7,5.5 L7,8 L10,8 L10,12 L7,12 L7,20 L3,20 L3,12 L0,12 L0,8 L3,8 L3,4 C3,1.790861 4.790861,4.4408921e-16 7,0 L10,0 Z"></path>
    </svg>
  );
};

export default Facebook;
