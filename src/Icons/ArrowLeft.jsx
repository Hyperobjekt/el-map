import React from 'react';
import clsx from 'clsx';

const ArrowLeft = ({ className, ...props }) => {
  return (
    <svg className={clsx('icon', 'icon--arrow-left', className)} viewBox="0 0 14 22" {...props}>
      <polygon points="14 19.1502078 11.0431896 22 0 10.6784244 11.0895003 0 13.9550552 2.94046212 5.82500971 10.7691355"></polygon>
    </svg>
  );
};

export default ArrowLeft;
