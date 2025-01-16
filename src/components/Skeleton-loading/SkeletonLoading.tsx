import { Skeleton, SkeletonProps } from 'antd';
import React from 'react';

interface skeletonProps extends SkeletonProps {
  skeletonType?: string;}

const SkeletonLoading: React.FC<skeletonProps> = ({ avatar, paragraph, round, title, style,  className, skeletonType }) => {
  return (
    <>
      {skeletonType === "Image" ? (

        <Skeleton.Image style={{width:"100%"}} className={className} active={true}  />
      ) : (
        <Skeleton 
          avatar={avatar} 
          paragraph={paragraph} 
          round={round} 
          title={title} 
          style={style} 
          className={className} 
        />
      )}
    </>
  );
};

export default SkeletonLoading;
