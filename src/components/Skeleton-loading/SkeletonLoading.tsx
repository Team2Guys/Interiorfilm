import { Skeleton, SkeletonProps } from 'antd';
import React from 'react';

const SkeletonLoading: React.FC<SkeletonProps> = ({ avatar, paragraph, round, title, style, active, className }) => {
  return (
    <Skeleton 
      avatar={avatar} 
      paragraph={paragraph} 
      round={round} 
      title={title} 
      style={style} 
      active={active} 
      className={className} 
    />
  );
}

export default SkeletonLoading;
