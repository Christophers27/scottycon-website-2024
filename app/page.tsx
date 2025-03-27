import { events } from "@/lib/data";
import EventCard from "@/components/eventCard";

export default function Home() {
  const upcomingEvents = events.filter(
    (event) =>
      Date.now() < Date.parse(`2025-03-29T${event.endTime}:00`) &&
      Date.parse(`2025-03-29T${event.startTime}:00`) < Date.now() + 3600000
  );

  return (
    <main className="page gap-8">
      <section className="section">
        <h1 className="section-title">Welcome to ScottyCon 2025!</h1>
        <p className="">
          Welcome to ScottyCon 2025! Feel free to explore the convention and
          enjoy the many events we have to offer, shown in the events page and
          the upcoming events within the next hour below. If you cannot find an
          event, check the map on the map page. If you have any questions, feel
          free to ask any of our staff members, who are wearing the ScottyCon
          2025 t-shirts. Enjoy the convention!
        </p>
      </section>
      <section className="section">
        <h1 className="section-title">Upcoming Events</h1>
        <div>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <EventCard key={event.name} {...event} />
            ))
          ) : (
            <p className="text-center">No upcoming events!</p>
          )}
        </div>
      </section>
      <section className="section">
        <h1 className="section-title">Lost & Found</h1>
        <p>
          If you have lost something, the lost and found is located at the UC
          Info Desk on the first floor. If you have found something, please
          bring it there.
        </p>
      </section>
      <section className="section">
        <h1 className="section-title">Wi-Fi</h1>
        <p>
          ScottyCon 2025 has free Wi-Fi! Connect to CMU-GUEST with your email
          and QALM3BA5 as the password.
        </p>
      </section>
    </main>
  );
}
