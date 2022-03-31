import React from "react";
import clsx from "clsx";

const ArrowRight = ({ className, ...props }) => {
  return (
    <svg
      className={clsx("icon", "icon--arrow-right", className)}
      viewBox="0 0 14 22"
      {...props}
    >
      <polygon points="0 19.1502078 8.17499029 10.7691355 0.0449448214 2.94046212 2.91049966 0 14 10.6784244 2.95681039 22"></polygon>
    </svg>
  );
};

export default ArrowRight;
