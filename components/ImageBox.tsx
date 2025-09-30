"use client";
import React, { useState } from "react";
import { StaticImageData } from "next/image";

interface Props {
  imagePath: StaticImageData;
  alt: string;
  caption: string;
  description: string;
}

interface toggleVisibilityProps {
  description: string;
}

function ToggleVisibility({ description }: toggleVisibilityProps) {
  const [isVisible, setIsVisible] = useState(false);

  const ToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="flex text-sm hover:underline"
        onClick={ToggleVisibility}
      >
        {isVisible ? "Hide ▲" : "Show More ▼"}
      </button>
      {isVisible && <p className="flex text-center">{description}</p>}
    </div>
  );
}

function ImageBox({ imagePath, alt, caption, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img
        src={imagePath.src}
        className="w-[400] h-[200] object-cover"
        alt={alt}
      ></img>
      <h1 className="font-semibold text-2xl text-center">{caption}</h1>
      <ToggleVisibility description={description} />
    </div>
  );
}

export default ImageBox;
