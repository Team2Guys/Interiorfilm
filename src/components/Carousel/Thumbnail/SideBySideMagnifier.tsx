import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface SideBySideMagnifierProps {
  imageSrc: string; // URL for the main image
  largeImageSrc: string; // URL for the high-resolution image
  zoomScale?: number; // Magnification scale
  inPlace?: boolean; // Whether to show the magnified image "in place"
  alignTop?: boolean; // Align magnified image to top or center
  fillSpace?: boolean; // Whether the zoomed image should fill the available space
}

const SideBySideMagnifier: React.FC<SideBySideMagnifierProps> = ({
  imageSrc,
  largeImageSrc,
  zoomScale = 2,
  inPlace = false,
  alignTop = false,
  fillSpace = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState<string>("0% 0%");
  const [displayInPlace, setDisplayInPlace] = useState(inPlace);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Function to calculate whether to display inPlace based on container width
  useEffect(() => {
    const container: any = containerRef.current;
    if (container) {
      const containerWidth = container.getBoundingClientRect().width;
      const windowWidth = window.innerWidth;

      if (windowWidth - containerWidth < 300) {
        setDisplayInPlace(true);
      } else {
        setDisplayInPlace(inPlace);
      }
    }
  }, [inPlace]);

  // Handle mouse movement over the image
  const handleMouseMove = (e: React.MouseEvent) => {
    const { top, left, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMagnifierPosition({
      x: x - 75, // Center magnifier (assuming a 150x150px box)
      y: alignTop ? 0 : y - 75,
    });

    const backgroundX = (x / width) * 100;
    const backgroundY = (y / height) * 100;
    setBackgroundPosition(`${backgroundX}% ${backgroundY}%`);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="relative bg-cover w-full h-full  cursor-crosshair"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
        }}
      >
        <Image
          src={imageSrc}
          width={800}
          height={800}
          alt="Main"
          className="bg-contain w-full h-full "
        />
      </div>

      {isHovered && (
        <div
          className={`absolute pointer-events-none ${
            displayInPlace ? "in-place" : "side-by-side"
          }`}
          style={{
            width: displayInPlace ? "100%" :  "md:max-h-[600px] lg:max-h-[470px] xl:max-h-[530px] 2xl:max-h-[700px]",
            height: displayInPlace ? "100%" :  "md:max-h-[600px] lg:max-h-[470px] xl:max-h-[530px] 2xl:max-h-[700px]",
            top: displayInPlace ? "0" : `${magnifierPosition.y}px`,
            left: displayInPlace ? "0" : "320px", 
            backgroundImage: `url(${largeImageSrc})`,
            backgroundPosition: backgroundPosition,
            backgroundSize: `${zoomScale * 100}%`,
            border: "1px solid orange",
            zIndex: 10,
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
          }}
        ></div>
      )}
    </div>
  );
};

export default SideBySideMagnifier;
