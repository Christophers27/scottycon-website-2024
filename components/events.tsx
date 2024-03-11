import React from "react";
import { events } from "@/lib/data";
import EventCard from "@/components/eventCard";

export default function Events() {
  return (
    <section className="bg-scottycon-background rounded-xl p-4 m-4 text-scottycon-text max-w-[50rem]">
      <h1 className="font-semibold text-2xl text-center">Events</h1>
      <ul>
        {events.map((event) => {
          if (Date.now() < Date.parse(`2024-03-23T${event.endTime}:00`)) {
            return <EventCard key={event.name} {...event} />;
          }
        })}
      </ul>
    </section>
  );
}
