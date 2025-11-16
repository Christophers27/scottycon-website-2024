import { events } from "@/lib/data";
import EventCard from "@/components/eventCard";

interface CalendarViewProps {
  search: string;
  filterType: string;
}

type Event = typeof events[0];

export default function CalendarView({ search, filterType }: CalendarViewProps) {

  const locations = Array.from(new Set(events.map((e) => e.location))).sort();
  
  const generateTimeSlots = () => {
    const slots: string[] = [];
    const startHour = 10;
    const endHour = 21;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        slots.push(date.toISOString());
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTimeSlotIndex = (eventTime: string) => {
    const eventDate = new Date(eventTime);
    const eventMinutes = eventDate.getHours() * 60 + eventDate.getMinutes();
    const startMinutes = 10 * 60;
    const slotIndex = Math.floor((eventMinutes - startMinutes) / 30);
    return slotIndex >= 0 ? slotIndex : -1;
  };

  const calculateRowSpan = (event: Event) => {
    const start = new Date(event.startTime).getTime();
    const end = new Date(event.endTime).getTime();
    const durationMinutes = (end - start) / (1000 * 60);
    return Math.ceil(durationMinutes / 30);
  };

  const occupiedCells = new Set<string>();

  const getEventStartingAt = (timeSlotIndex: number, location: string) => {
    return filteredEvents.find((event) => {
      const eventSlotIndex = getTimeSlotIndex(event.startTime);
      return eventSlotIndex === timeSlotIndex && event.location === location;
    });
  };

  return (
    <div className="flex-1 overflow-auto border border-gray-300">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-gray-100 sticky top-0 left-0 z-20">
              Time
            </th>
            {locations.map((location) => (
              <th
                key={location}
                className="border border-gray-300 p-2 bg-gray-100 sticky top-0 z-10 min-w-[200px]"
              >
                {location}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, timeIndex) => (
            <tr key={time}>
              <td className="border border-gray-300 p-2 bg-gray-50 sticky left-0 z-10 whitespace-nowrap">
                {new Date(time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              {locations.map((location) => {
                const cellKey = `${timeIndex}-${location}`;
                
                if (occupiedCells.has(cellKey)) {
                  return null;
                }

                const event = getEventStartingAt(timeIndex, location);
                
                if (event) {
                  const rowSpan = calculateRowSpan(event);
                  
                  for (let i = 1; i < rowSpan; i++) {
                    occupiedCells.add(`${timeIndex + i}-${location}`);
                  }

                  return (
                    <td
                      key={cellKey}
                      rowSpan={rowSpan}
                      className="border border-gray-300 p-2 align-top bg-scottycon-blue rounded-xl animate"
                    >
                      <EventCard {...event} />
                    </td>
                  );
                }

                return (
                  <td
                    key={cellKey}
                    className="border border-gray-300 h-20 p-2 align-top"
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}