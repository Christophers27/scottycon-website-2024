"use client";

import React, { useState } from "react";
import { events } from "@/lib/data";
import EventCard from "@/components/eventCard";
import { useFavorites } from "@/context/favoritesContext";
import { createICSFile } from "@/lib/generateics";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const groupByTime = events.reduce(
    (groups: Record<string, typeof events>, event) => {
      const [hh, mm] = event.startTime.split("T")[1].split(":"); // Extract hours and minutes from startTime

      const key = `${+hh > 12 ? +hh % 12 : hh}:${+mm < 30 ? "00" : "30"} ${
        +hh >= 12 ? "PM" : "AM"
      }`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(event);
      return groups;
    },
    {}
  );

  const handleDownload = () => {
    const icsContent = createICSFile(events);
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "scottycon_event_schedule.ics";
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <main className="page">
      <div>
        <button onClick={handleDownload}>Download Calendar</button>
      </div>
      <section className="section flex flex-col h-[80dvh]">
        <div className="flex-none">
          <h1 className="section-title">Events</h1>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="border-b-2 border-black/10 mb-4 w-full"
          />
          <div className="flex flex-row gap-4 mb-4">
            <FilterTypeButton
              type="Activity"
              filterType={filterType}
              setFilterType={setFilterType}
            />
            <FilterTypeButton
              type="Panel"
              filterType={filterType}
              setFilterType={setFilterType}
            />
            <FilterTypeButton
              type="Performance"
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {Object.keys(groupByTime)
            .sort()
            .map((time) => (
              <TimeSection
                key={time}
                time={time}
                timeEvents={groupByTime[time]}
                search={search}
                filterType={filterType}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

interface FilterTypeButtonProps {
  type: string;
  filterType: string;
  setFilterType: (type: string) => void;
}

function FilterTypeButton({
  type,
  filterType,
  setFilterType,
}: FilterTypeButtonProps) {
  return (
    <button
      className={`${
        filterType === type ? "bg-scottycon-blue" : "bg-white/50"
      } px-2 py-1 text-sm rounded-full border-2 border-black/10`}
      onClick={() => setFilterType(type === filterType ? "all" : type)}
    >
      {type}
    </button>
  );
}

interface TimeSectionProps {
  time: string;
  timeEvents: typeof events;
  search: string;
  filterType: string;
}

function TimeSection({
  time,
  timeEvents,
  search,
  filterType,
}: TimeSectionProps) {
  const { favorites } = useFavorites();

  const filteredEvents = timeEvents.filter((event) => {
    const isFavorite = favorites.includes(event.name);

    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filterType === "all" || event.type === filterType;

    return isFavorite || (matchesSearch && matchesFilter);
  });

  if (filteredEvents.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="flex bg-scottycon-blue border-2 border-black/10 rounded-full">
        <h2 className="basis-1/4 flex flex-col items-end font-bold px-1">
          {time}
        </h2>
        <div className="flex basis-3/4 h-full" />
      </div>
      <div className="flex flex-col flex-1 w-full">
        {filteredEvents
          .sort((a, b) => a.endTime.localeCompare(b.endTime))
          .sort((a, b) => a.startTime.localeCompare(b.startTime))
          .map((event) => (
            <EventCard key={event.name} {...event} />
          ))}
      </div>
    </div>
  );
}
