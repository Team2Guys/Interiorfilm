'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';
import video from "../../../../public/images/icon/Video.png"
import Image from 'next/image';

const InteriorVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <div className="text-center mt-10 flex flex-col justify-center items-center space-y-2">
        {/* <FaArrowDownLong className="text-primary" />
        <p className="uppercase text-[14px] leading-6 tracking-widest">
          ALL collection
        </p> */}
      </div>
      <div className="relative w-full h-[483px] mt-10">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          onClick={handlePlayPause}
          autoPlay
        >
          <source src="/video/Agsons.mp4" type="video/mp4" />
        </video>
        {/* {!isPlaying && (
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 flex items-center justify-center  hover:bg-opacity-75 transition-opacity"
          >
           <Image width={97} height={90} src={video} alt='video' />
          </button>
        )} */}
      </div>
    </>
  );
};

export default InteriorVideo;
