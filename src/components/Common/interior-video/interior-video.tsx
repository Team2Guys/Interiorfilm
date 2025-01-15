'use client';
import React, { useRef} from 'react';

const InteriorVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  return (
    <>
      <div className="text-center flex flex-col justify-center items-center space-y-2">
    
      </div>
      <div className="relative w-full h-[490px] mt-5">
        <video
          ref={videoRef}
          className="w-full h-[490px] object-cover"
          loop
          muted
          playsInline
          autoPlay
        >
          <source src="/video/Agsons.mp4" type="video/mp4" />
        </video>

      </div>
    </>
  );
};

export default InteriorVideo;
