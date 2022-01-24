import React from 'react';

const Badge: React.FC = ({ children }) => {
  return (
    <span className="bg-white  text-black font-medium px-4  rounded-full">
      {children}
    </span>
  );
};

export default Badge;
