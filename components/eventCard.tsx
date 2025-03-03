"use client";

import React, { ReactElement, useState } from "react";
import { events } from "@/lib/data";
import {
  BsFillGeoAltFill,
  BsPersonWalking,
  BsPersonVideo3,
  BsMusicNote,
} from "react-icons/bs";
import { FaUtensils } from "react-icons/fa";

type eventCardProps = (typeof events)[number];

export default function EventCard({
  name,
  description,
  type,
  startTime,
  endTime,
  location,
  img,
}: eventCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex" onClick={() => setExpanded(!expanded)}>
      <div className="flex flex-col basis-1/5 align-top items-end px-1 py-2">
        <p className="font-semibold">{startTime}</p>
        <p className="text-scottycon-text/50">{endTime}</p>
      </div>
      <div className="flex flex-col items-start basis-4/5 px-2 py-2 border-b border-black/10">
        <h2 className="font-semibold">{name}</h2>
        <p className="text-scottycon-text/50 text-sm flex items-center gap-1">
          <BsFillGeoAltFill className="inline" /> {location}
        </p>
        <p className="text-scottycon-text/50 text-sm flex items-center gap-1">
          {type === "Activity" && <BsPersonWalking className="inline" />}
          {type === "Food" && <FaUtensils className="inline" />}
          {type === "Panel" && <BsPersonVideo3 className="inline" />}
          {type === "Performance" && <BsMusicNote className="inline" />}
          {type}
        </p>
        {expanded && (
          <div className="flex flex-col items-start pt-1">
            <p className="text-scottycon-text text-sm">{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
