import React from "react";
import clsx from "clsx";

const Minus = ({ className, ...props }) => {
  return (
    <svg
      className={clsx("icon", "icon--minus", className)}
      viewBox="0 0 22 6"
      {...props}
    >
      <rect x="0" y="0" width="22" height="6"></rect>
    </svg>
  );
};

export default Minus;
