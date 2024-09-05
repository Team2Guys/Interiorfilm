import { Skeleton, SkeletonProps } from 'antd';
import React from 'react';

interface skeletonProps extends SkeletonProps {
  skeletonType?: string;}

const SkeletonLoading: React.FC<skeletonProps> = ({ avatar, paragraph, round, title, style, active, className, skeletonType }) => {
  return (
    <>
      {skeletonType === "Image" ? (

        <Skeleton.Image style={{width:"100%"}} className={className}    active={true}  />
      ) : (
        <Skeleton 
          avatar={avatar} 
          paragraph={paragraph} 
          round={round} 
          title={title} 
          style={style} 
          active={true} 
          className={className} 
        />
      )}
    </>
  );
};

export default SkeletonLoading;
