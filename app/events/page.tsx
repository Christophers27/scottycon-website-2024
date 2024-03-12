"use client";

import React, { useState } from "react";
import SectionHeader from "@/components/sectionHeader";
import EventCard from "@/components/eventCard";
import { events } from "@/lib/data";

export default function EventsPage() {
  const [search, setSearch] = useState("");

  function handleSearch(searchTerm: string) {
    setSearch(searchTerm);
  }

  return (
    <div className="flex flex-col flex-1 bg-scottycon-background rounded-t-xl p-8 text-scottycon-text items-center">
      <SectionHeader>Events</SectionHeader>

      <input
        type="text"
        placeholder="Search by event name"
        onChange={(e) => handleSearch(e.target.value)}
        className="bg-scottycon-foreground m-4 p-4 rounded-full outline-none shadow-lg"
      />

      <ul>
        {events.map((event) => {
          if (event.name.toLowerCase().includes(search.toLowerCase())) {
            return <EventCard key={event.name} {...event} />;
          }
        })}
      </ul>
    </div>
  );
}
