'use client'
import React from 'react';
import Slider from 'components/ui/Slider/Slider'; // Import the Slider component


const HeroSlider = () => {

  const slides = [
    {
      image: '/images/slider1.png',
      title: 'Stylish Kitchen',
      subtitle: 'Makeovers',
      description: 'Quickly and cleanly transform your kitchen using our proven self adhesive.',
    },
    {
      image: '/images/slider1.png',
      title: 'Quality Products',
      subtitle: 'Makeovers',
      description: 'Get free Quality Products for your interior design project.',
    },
    {
      image: '/images/slider1.png',
      title: 'Stylish Kitchen',
      subtitle: 'Makeovers',
      description: 'Quickly and cleanly transform your kitchen using our proven self adhesive.',
    },
    // Add more slides as needed
  ];

  return (
    <Slider slides={slides} />
  );
};

export default HeroSlider;
