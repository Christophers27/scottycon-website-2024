import { events } from "@/lib/data";
import EventCard from "@/components/eventCard";

export default function Home() {
  const upcomingEvents = events.filter(
    (event) =>
      Date.now() < Date.parse(event.endTime) &&
      Date.parse(event.startTime) < Date.now() + 3600000
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
        <h1 className="section-title">Notices</h1>
        <p className="mb-2">
          <strong>Wi-Fi:</strong> ScottyCon 2025 has free Wi-Fi! Connect to
          CMU-GUEST with your email and D46BQ8AG as the password.
        </p>
        <p className="mb-2">
          <strong>Trading:</strong> Some of our vendors offer game, console, or
          card trade-ins. If you are interested, please be sure to bring your
          items to our event!
        </p>
        <p className="mb-2">
          <strong>Lost & Found:</strong> If you have lost something, the lost
          and found is located at the UC Info Desk on the first floor. If you
          have found something, please bring it there.
        </p>
      </section>
    </main>
  );
}
