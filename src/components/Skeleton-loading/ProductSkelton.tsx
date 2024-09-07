import React from 'react';
import { Skeleton, Row, Col } from 'antd';

export const ProductSkeleton: React.FC = () => {
  return (
    <Row className="flex flex-col md:flex-row my-10  justify-center">
      <Col xs={24} md={12} className="">
        {/* Image Skeleton */}
        <Skeleton.Image style={{ width: '50rem', height: '400px', borderRadius: '8px' }} />
      </Col>

      <Col xs={24} md={12} lg={6}>
        <div className="flex flex-col gap-4 pt-2">
          {/* Skeleton for Buttons */}
          <div className="flex gap-2">
            <Skeleton.Button style={{ width: 80, height: 24 }} shape="round" active />
            <Skeleton.Button style={{ width: 80, height: 24 }} shape="round" active />
            <Skeleton.Button style={{ width: 80, height: 24 }} shape="round" active />
          </div>

          {/* Price and Title Skeleton */}
          <Skeleton.Input style={{ width: 150, height: 24 }} active />
          <Skeleton.Input style={{ width: 250, height: 16 }} active />
          <Skeleton.Input style={{ width: 200, height: 16 }} active />

          {/* Stock Info Skeleton */}
          <Skeleton.Input style={{ width: 100, height: 16 }} active />

          {/* Payment Options */}
          <Skeleton.Input style={{ width: 300, height: 16 }} active />

          {/* Action Buttons Skeleton */}
          <div className="flex gap-2 mb-4">
            <Skeleton.Button style={{ width: '50%', height: 48 }} shape="round" active />
            <Skeleton.Button style={{ width: '50%', height: 48 }} shape="round" active />
          </div>
         
          <Skeleton.Button style={{ width: '100%', height: 48 }} shape="round" active />


        </div>
      </Col>
    </Row>
  );
};
