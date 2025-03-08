import React from "react";
import { events } from "@/lib/data";
import EventCard from "@/components/eventCard";
import SectionHeader from "@/components/sectionHeader";
import SectionDivider from "@/components/sectionDivider";
import SendNotifications from "@/components/sendNotifications";

export default function Home() {
  const upcomingEvents = events.filter(
    (event) =>
      Date.now() < Date.parse(`2025-03-29T${event.endTime}:00`) &&
      Date.parse(`2025-03-29T${event.startTime}:00`) < Date.now() + 3600000
  );

  return (
    <div className="flex flex-col flex-1 bg-scottycon-background rounded-t-xl p-8 text-scottycon-text items-center">
      <section className="flex flex-col mt-8 max-w-[45rem]">
        <SectionHeader>Welcome to ScottyCon 2025!</SectionHeader>
        <SendNotifications />
        <p className="text-center bg-scottycon-foreground m-8 px-8 py-4 text-l rounded-xl">
          Welcome to ScottyCon 2025! Feel free to explore the convention and
          enjoy the many events we have to offer, shown in the events page and
          the upcoming events within the next hour below. If you cannot find an
          event, check the map on the map page. If you have any questions, feel
          free to ask any of our staff members, who are wearing the ScottyCon
          2025 t-shirts. Enjoy the convention!
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
          If you have lost something, the lost and found is located at the UC
          Info Desk on the first floor. If you have found something, please
          bring it there.
        </p>
      </section>
      <SectionDivider />
      <section className="flex flex-col mt-8 max-w-[45rem]">
        <SectionHeader>Wi-Fi</SectionHeader>
        <p className="text-center bg-scottycon-foreground m-8 px-8 py-4 text-l rounded-xl">
          ScottyCon 2025 has free Wi-Fi! Connect to CMU-GUEST with your email
          and QALM3BA5 as the password.
        </p>
      </section>
    </div>
  );
}
