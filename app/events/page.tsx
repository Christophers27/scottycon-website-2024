"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/sectionHeader";
import EventCard from "@/components/eventCard";
import { events } from "@/lib/data";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [collapsedTypes, setCollapsedTypes] = useState<string[]>([]);

  const groupByType = events.reduce(
    (groups: Record<string, typeof events>, event) => {
      const key = event.type;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(event);
      return groups;
    },
    {}
  );

  function handleSearch(searchTerm: string) {
    setSearch(searchTerm);
  }

  function handleCollapse(type: string) {
    if (collapsedTypes.includes(type)) {
      setCollapsedTypes(collapsedTypes.filter((t) => t !== type));
    } else {
      setCollapsedTypes([...collapsedTypes, type]);
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-scottycon-background rounded-t-xl p-8 text-scottycon-text items-center">
      <SectionHeader>Events</SectionHeader>

      <input
        type="text"
        placeholder="Search by event name"
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-scottycon-foreground m-4 px-8 py-4 rounded-full outline-none shadow-lg"
      />

      <ul>
        {Object.entries(groupByType).map(([type, events]) => {
          return (
            <li
              key={type}
              className="bg-scottycon-foreground/[0.6] p-4 rounded-xl my-4"
              onClick={() => handleCollapse(type)}
            >
              <h2 className="text-2xl font-bold">{type}</h2>
              {!collapsedTypes.includes(type) && (
                <ul>
                  {events
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                    .map((event) => {
                      if (
                        event.name.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return <EventCard key={event.name} {...event} />;
                      }
                    })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
