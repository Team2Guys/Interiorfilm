import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface SideBySideMagnifierProps {
  imageSrc: string;
  largeImageSrc: string; 
  zoomScale?: number;
  inPlace?: boolean; 
  alignTop?: boolean;
  fillSpace?: boolean;
  altText?: string;
}

const SideBySideMagnifier: React.FC<SideBySideMagnifierProps> = ({
  imageSrc,
  largeImageSrc,
  altText,
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

  const handleMouseMove = (e: React.MouseEvent) => {
    const { top, left, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMagnifierPosition({
      x: x - 75,
      y: alignTop ? 0 : y - 75,
    });

    const backgroundX = (x / width) * 100;
    const backgroundY = (y / height) * 100;
    setBackgroundPosition(`${backgroundX}% ${backgroundY}%`);
  };

  return (
    <div className="relative h-full" 
    ref={containerRef}
    >
      <div
        className="relative w-full h-full   cursor-zoom-in"
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
          alt={altText || ''}
          className="w-full h-full "
        />
      </div>

      {isHovered && (
        <div
          className={`absolute pointer-events-none ${
            displayInPlace ? "in-place" : "side-by-side"
          }`}
          style={{
            width: displayInPlace ? "100%" :  "",
            height: displayInPlace ? "100%" :  "",
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
