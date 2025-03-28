"use client";

import React, { useState } from "react";
import { events } from "@/lib/data";
import {
  BsFillGeoAltFill,
  BsPersonWalking,
  BsPersonVideo3,
  BsMusicNote,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import { FaUtensils } from "react-icons/fa";
import { useFavorites } from "@/context/favoritesContext";

type eventCardProps = (typeof events)[number];

export default function EventCard({
  name,
  description,
  type,
  startTime,
  endTime,
  location,
}: eventCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { favorites, toggleFavorite, isInitialized } = useFavorites();

  const isFavorite = isInitialized && favorites.includes(name);

  const handleToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFavorite(name);
  };

  const [startHH, startMM] = startTime.split("T")[1].split(":");
  const [endHH, endMM] = endTime.split("T")[1].split(":");

  const [startHours, endHours] = [+startHH, +endHH];

  const startHHMM = `${
    startHours > 12 ? startHours % 12 : startHours
  }:${startMM} ${startHours >= 12 ? "PM" : "AM"}`;
  const endHHMM = `${endHours > 12 ? endHours % 12 : endHours}:${endMM} ${
    endHours >= 12 ? "PM" : "AM"
  }`;

  return (
    <div className="flex" onClick={() => setExpanded(!expanded)}>
      <div className="flex flex-col basis-1/4 align-top items-end px-1 py-2">
        <p className="font-semibold">{startHHMM}</p>
        <p className="text-black/75">{endHHMM}</p>
      </div>
      <div className="flex flex-col items-start basis-3/4 px-2 py-2 border-b border-black/10">
        <div className="flex align-top gap-1 w-full">
          <h2 className="font-semibold">{name}</h2>
          {isInitialized && (
            <button onClick={handleToggle} className="ml-auto">
              {isFavorite ? (
                <BsStarFill className="text-yellow-500" />
              ) : (
                <BsStar />
              )}
            </button>
          )}
        </div>
        <p className="text-black/75 text-sm flex items-center gap-1">
          <BsFillGeoAltFill className="inline" /> {location}
        </p>
        <p className="text-black/75 text-sm flex items-center gap-1">
          {type === "Activity" && <BsPersonWalking className="inline" />}
          {type === "Food" && <FaUtensils className="inline" />}
          {type === "Panel" && <BsPersonVideo3 className="inline" />}
          {type === "Performance" && <BsMusicNote className="inline" />}
          {type}
        </p>
        {expanded && (
          <div className="flex flex-col items-start pt-1">
            <p className="text-sm">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
