import React from "react";
import clsx from "clsx";

const Map = ({ className, ...props }) => {
  return (
    <svg
      className={clsx("icon", "icon--map", className)}
      viewBox="0 0 22 21"
      {...props}
    >
      <path d="M0,2.3715415 L6.50175606,0 L6.50175606,18.6284585 L0,21 L0,2.3715415 Z M8.21898391,0 L14.2129627,2.34554576 L14.2129627,20.9635147 L8.21898391,18.617969 L8.21898391,0 Z M16.0060212,2.34554576 L22,0 L22,18.6184251 L16.0060212,20.9639708 L16.0060212,2.34554576 Z"></path>
    </svg>
  );
};

export default Map;
