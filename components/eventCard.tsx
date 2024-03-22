"use client";

import React, { useState } from "react";
import { events } from "@/lib/data";
import {
  BiSolidMap,
  BiSolidPurchaseTag,
  BiSolidDetail,
  BiSolidTimeFive,
} from "react-icons/bi";
import Image from "next/image";

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
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <div
      className="bg-scottycon-foreground p-4 m-4 rounded-xl shadow-lg text-scottycon-text min-w-[20rem] max-w-[50rem]"
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
            <BiSolidPurchaseTag className="min-w-4" />
            <p>{type}</p>
          </div>
          <div className="flex gap-2 items-center">
            <BiSolidTimeFive className="min-w-4" />
            <p>
              {startTime} - {endTime}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <BiSolidMap className="min-w-4" />
            <p>{location}</p>
          </div>
          <div className="flex gap-2">
            <BiSolidDetail className="min-w-4 mt-1" />
            <p className="whitespace-pre-wrap">{description}</p>
          </div>
          {img && (
            <Image
              src={img}
              alt={name}
              className="py-4 object-contain max-h-96"
            />
          )}
        </>
      )}
    </div>
  );
}
