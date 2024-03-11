import React from "react";
import SectionHeader from "@/components/sectionHeader";
import EventCard from "@/components/eventCard";
import { events } from "@/lib/data";

export default function EventsPage() {
  return (
    <div className="flex flex-col flex-1 bg-scottycon-background rounded-t-xl p-8 text-scottycon-text items-center">
      <SectionHeader>Events</SectionHeader>

      <ul>
        {events.map((event) => {
          if (Date.now() < Date.parse(`2024-03-23T${event.endTime}:00`)) {
            return <EventCard key={event.name} {...event} />;
          }
        })}
      </ul>
    </div>
  );
}
