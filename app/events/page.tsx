"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/sectionHeader";
import EventCard from "@/components/eventCard";
import { events } from "@/lib/data";

export default function EventsPage() {
  const [search, setSearch] = useState("");

  // Group events by start time, every 30 minutes
  const groupByTime = events.reduce(
    (groups: Record<string, typeof events>, event) => {
      const mm = event.startTime.split(":")[1] < "30" ? "00" : "30";
      const key = `${event.startTime.split(":")[0]}:${mm}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(event);
      return groups;
    },
    {}
  );

  return (
    <div className="flex flex-col flex-1 bg-scottycon-background rounded-t-xl p-8 text-scottycon-text items-center">
      <SectionHeader>Events</SectionHeader>
      <input
        type="text"
        placeholder="Search by event name"
        onChange={(e) => setSearch(e.target.value)}
        className="bg-scottycon-foreground m-4 px-8 py-4 rounded-full outline-none shadow-lg"
      />
      <div className="flex flex-col w-full max-w-[45rem] h-[60svh] rounded-xl bg-scottycon-foreground p-2 overflow-auto">
        {Object.keys(groupByTime)
          .sort()
          .map((time) => (
            <div key={time} className="flex flex-col">
              <div className="flex bg-scottycon-background/75 rounded-full">
                <h2 className="basis-1/5 flex flex-col items-end font-semibold text-xl px-1">
                  {time}
                </h2>
                <div className="flex basis-4/5 h-full" />
              </div>
              <div className="flex flex-col flex-1 w-full">
                {groupByTime[time]
                  .filter(
                    (event) =>
                      event.name.toLowerCase().includes(search.toLowerCase()) ||
                      event.description
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((event) => (
                    <EventCard key={event.name} {...event} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
