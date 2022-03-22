import React from "react";
import clsx from "clsx";

const Copy = ({ className, ...props }) => {
  return (
    <svg className={clsx("icon", className)} viewBox="0 0 19 22" {...props}>
      <path d="M17,20 L6,20 L6,6 L17,6 L17,20 Z M17,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,20 C4,21.1045695 4.8954305,22 6,22 L17,22 C18.1045695,22 19,21.1045695 19,20 L19,6 C19,4.8954305 18.1045695,4 17,4 Z M14,0 L2,0 C0.8954305,-1.11022302e-16 0,0.8954305 0,2 L0,16 L2,16 L2,2 L14,2 L14,0 Z"></path>
    </svg>
  );
};

export default Copy;
