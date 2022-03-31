import React from "react";
import clsx from "clsx";

const Menu = ({ className, ...props }) => {
  return (
    <svg
      className={clsx("icon", "icon--menu", className)}
      viewBox="0 0 22 22"
      {...props}
    >
      <path d="M0,0 L22,0 L22,4 L0,4 L0,0 Z M0,9 L22,9 L22,13 L0,13 L0,9 Z M0,18 L22,18 L22,22 L0,22 L0,18 Z"></path>
    </svg>
  );
};

export default Menu;
