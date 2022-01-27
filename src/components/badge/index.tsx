import React from 'react';

const Badge: React.FC<{ classes?: string }> = ({ children, classes }) => {
  return (
    <span
      className={`bg-white  text-black font-medium px-4  rounded-full ${
        classes ?? ''
      }`}
    >
      {children}
    </span>
  );
};

export default Badge;
