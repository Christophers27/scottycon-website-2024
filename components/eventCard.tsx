"use client";

import React, { useState } from "react";
import { events } from "@/lib/data";
import {
  BiSolidMap,
  BiSolidPurchaseTag,
  BiSolidDetail,
  BiSolidTimeFive,
} from "react-icons/bi";

type eventCardProps = (typeof events)[number];

export default function EventCard({
  name,
  description,
  type,
  startTime,
  endTime,
  location,
}: eventCardProps) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <div
      className="bg-scottycon-foreground p-4 m-4 rounded-xl shadow-lg text-scottycon-text"
      onClick={handleClick}
    >
      <h2 className="font-bold text-lg border-b border-scottycon-text mb-2">
        {name}
      </h2>

      {!clicked && (
        <>
          <p className="">{type}</p>
          <p className="">
            {startTime} - {endTime} | {location}
          </p>
        </>
      )}

      {clicked && (
        <>
          <div className="flex gap-2 items-center">
            <BiSolidPurchaseTag />
            <p>{type}</p>
          </div>
          <div className="flex gap-2 items-center">
            <BiSolidTimeFive />
            <p>
              {startTime} - {endTime}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <BiSolidMap />
            <p>{location}</p>
          </div>
          <div className="flex gap-2 items-center">
            <BiSolidDetail />
            <p>{description}</p>
          </div>
        </>
      )}
    </div>
  );
}
