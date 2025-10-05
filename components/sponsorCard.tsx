"use client";

import React from "react";

const tierStyles: Record<string, string> = {
  gold: "border-yellow-400 bg-yellow-100/40 hover:shadow-yellow-300 animate-pulse",
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

  function slideOpen() {
    return (
      <p className="text-sm text-gray-700 line-clamp-4">
        {description}
      </p>
    );
  }

  return (
    <a
      key={name}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        flex flex-col items-center gap-4 text-left 
        bg-white/40 backdrop-blur-md rounded-2xl p-4 
        border transition transform hover:scale-105 hover:shadow-lg 
        ${tierStyles[tier]} 
        animate-fadeIn delay-[${index * 100}ms]
      `}
      onClick={slideOpen}
    >
      <img
        src={logo}
        alt={`${name} logo`}
        className="w-16 h-16 object-contain flex-shrink-0 rounded-md"
      />
      <h3 className="text-lg font-semibold mb-1">
        {name}
      </h3>
    </a>
    );
}