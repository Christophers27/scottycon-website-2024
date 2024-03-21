import React from "react";
import { events } from "@/lib/data";
import EventCard from "@/components/eventCard";
import SectionHeader from "@/components/sectionHeader";
import SectionDivider from "@/components/sectionDivider";

export default function Home() {
  const upcomingEvents = events.filter(
    (event) =>
      Date.now() < Date.parse(`2024-03-23T${event.endTime}:00`) &&
      Date.parse(`2024-03-23T${event.startTime}:00`) < Date.now() + 3600000
  );

  return (
    <div className="flex flex-col flex-1 bg-scottycon-background rounded-t-xl p-8 text-scottycon-text items-center">
      <section className="flex flex-col mt-8 max-w-[45rem]">
        <SectionHeader>Welcome to ScottyCon 2024!</SectionHeader>
        <p className="text-center bg-scottycon-foreground m-8 px-8 py-4 text-l rounded-xl">
          This is the digital booklet for ScottyCon 2024. Below you can see the
          upcoming events, and you can see all events and the map in the
          navigation bar.
        </p>
      </section>
      <SectionDivider />
      <section className="mt-8">
        <SectionHeader>Upcoming Events</SectionHeader>
        <ul className="">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <EventCard key={event.name} {...event} />
            ))
          ) : (
            <p className="text-center bg-scottycon-foreground m-8 px-8 py-4 text-l rounded-xl">
              No upcoming events, sorry!
            </p>
          )}
        </ul>
      </section>
      <SectionDivider />
      <section className="flex flex-col mt-8 max-w-[45rem]">
        <SectionHeader>Lost and Found</SectionHeader>
        <p className="text-center bg-scottycon-foreground m-8 px-8 py-4 text-l rounded-xl">
          If you have lost something, the lost and found is located at the merch
          table. If you have found something, please bring it to the lost and
          found!
        </p>
      </section>
    </div>
  );
}
