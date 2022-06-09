import React from 'react';
import clsx from 'clsx';

const Home = ({ className, ...props }) => {
  return (
    <svg className={clsx('icon', 'icon--home', className)} viewBox="0 0 22 21" {...props}>
      <path d="M13.125,21 L13.125,15 L8.875,15 L8.875,21 L0,21 L0,10.5 L11,0 L22,10.5 L22,21 L13.125,21 Z"></path>
    </svg>
  );
};

export default Home;
