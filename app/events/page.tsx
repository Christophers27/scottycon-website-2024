"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/sectionHeader";
import TimeSection from "@/components/timeSection";
import FilterTypeButton from "@/components/filterTypeButton";
import { events } from "@/lib/data";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

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
      <div className="flex flex-row gap-4 mb-4">
        <FilterTypeButton
          type="Activity"
          filterType={filterType}
          setFilterType={setFilterType}
        />
        <FilterTypeButton
          type="Food"
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
      <div className="flex flex-col w-full max-w-[45rem] h-[60svh] rounded-xl bg-scottycon-foreground p-2 overflow-auto">
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
    </div>
  );
}
