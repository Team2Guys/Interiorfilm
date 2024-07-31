import React, { ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  children?: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`lg:max-w-screen-xl xl:max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6 ${className}`}>
      {children}
    </div>
  );
};

export default Container;