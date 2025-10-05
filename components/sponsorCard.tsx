"use client";

import React from "react";

const tierStyles: Record<string, string> = {
  gold: "border-yellow-400 bg-yellow-100/40 hover:shadow-yellow-300",
  silver: "border-gray-400 bg-gray-100/40 hover:shadow-gray-300",
  bronze: "border-amber-600 bg-amber-100/40 hover:shadow-amber-300",
};

export default function SponsorCard({
  name,
  logo,
  website,
  description,
  tier,
  index,
}: {
  name: string;
  logo: string;
  website: string;
  description: string;
  tier: string;
  index: number;
}) {

  const [isOpen, setIsOpen] = React.useState(false);
  
  function flip() {
    setIsOpen(!isOpen);
  }

  return (
    <a 
      key={name}
      type="button"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        items-center gap-4 cursor-pointer h-48 flex rounded-2xl
        transition transform hover:scale-105 perspective-midrange
        animate-fadeIn delay-[${index * 100}ms]
      `}
      onClick={() => flip()}
      >
      <div
        className={`
          relative size-full transition duration-1000 transition-all
          transform-3d hover:shadow-lg rounded-2xl
          ${isOpen ? 'rotate-y-180' : 'rotate-y-0'}
        `}
        style={{ transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        aria-label={`Sponsor card for ${name}. Click to ${isOpen ? 'show front' : 'show back'}.`}
      >
        <div className="absolute inset-0 size-full rounded-2xl backface-hidden rotate-x-0">
          <div className={`
            flex flex-col size-full items-center bg-white/40 rounded-2xl p-4
            border justify-center ${tierStyles[tier]}
          `}>
            <img
              src={logo}
              alt={`${name} logo`}
              className="size-40 object-contain flex-shrink-0 rounded-md"
            />
            <h3 className="text-lg font-semibold mb-1">
              {name}
            </h3>
          </div>
        </div>
        <div className="absolute inset-0 size-full rounded-2xl backface-hidden rotate-x-0 rotate-y-180">
          <div className={`
            flex flex-col size-full items-center bg-white/40 rounded-2xl p-4
            border justify-center ${tierStyles[tier]}
          `}>
            <p className="text-left text-sm text-gray-700 line-clamp-4">
              {description}
            </p>
          </div>
        </div>
      </div>
    </a>
    );
}