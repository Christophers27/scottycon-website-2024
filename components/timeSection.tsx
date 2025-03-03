"use client";

import { useEffect } from "react";
import EventCard from "./eventCard";
import { events } from "@/lib/data";
import { getFavorites } from "@/lib/helpers";

interface TimeSectionProps {
  time: string;
  timeEvents: typeof events;
  search: string;
  filterType: string;
}

export default function TimeSection({
  time,
  timeEvents,
  search,
  filterType,
}: TimeSectionProps) {
  const filteredEvents = timeEvents.filter((event) => {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(event.name);

    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === "" || event.type === filterType;
    return isFavorite || (matchesSearch && matchesFilter);
  });

  if (filteredEvents.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex bg-scottycon-background/75 rounded-full">
        <h2 className="basis-1/5 flex flex-col items-end font-semibold text-xl px-1">
          {time}
        </h2>
        <div className="flex basis-4/5 h-full" />
      </div>
      <div className="flex flex-col flex-1 w-full">
        {filteredEvents
          .sort((a, b) => a.endTime.localeCompare(b.endTime))
          .map((event) => (
            <EventCard key={event.name} {...event} />
          ))}
      </div>
    </div>
  );
}
