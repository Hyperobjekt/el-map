import React from "react";
import clsx from "clsx";

const Warning = ({ className, ...props }) => {
  return (
    <svg
      style={{ transform: "rotate(180deg)" }}
      className={clsx("icon", "icon--warning", className)}
      viewBox="2 0 22 24"
      {...props}
    >
      <path d="M12,22 C5.92486775,22 1,17.0751322 1,11 C1,4.92486775 5.92486775,0 12,0 C18.0751322,0 23,4.92486775 23,11 C23,17.0751322 18.0751322,22 12,22 Z M11.89,7.77999997 C12.65728,7.77999997 13.28,7.15727998 13.28,6.38999999 C13.28,5.62271999 12.65728,5 11.89,5 C11.12272,5 10.5,5.62271999 10.5,6.38999999 C10.5,7.15727998 11.12272,7.77999997 11.89,7.77999997 Z M10.5,9.47999954 L10.5,16.9799995 L13.28,16.9799995 L13.28,9.47999954 L10.5,9.47999954 Z"></path>
    </svg>
  );
};

export default Warning;
