import { EventType } from "./data";

function formatTime(dateTime: string): string {
    return dateTime.replace(/[-:]/g, ''); 
}

function cleanText(content:string):string{
    return content.replace(/;/g,'\\;').replace(/(\r\n|\n|\r)/g,' ');
}

const ICS_HEADER: string = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your-Anime-Con-Schedule//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:ScottyCon Events
`;

const ICS_FOOTER: string = `END:VCALENDAR`;

export function createICSFile(events: EventType[]): string {
    const icsEvents = events.map((event, index) => {
        
        const startICS = formatTime(event.startTime); 
        const endICS = formatTime(event.endTime);

        const cleanName = cleanText(event.name);
        const cleanDescription = cleanText(event.description);
        const cleanLocation = cleanText(event.location);

        const DTSTAMP = formatTime(new Date().toISOString()).slice(0, 15) + 'Z';
        const UID = `scottycon-${Date.now()}-${index}@scottyconevents`;

       return `BEGIN:VEVENT
UID:${UID}
DTSTAMP:${DTSTAMP}
DTSTART:${startICS}
DTEND:${endICS}
SUMMARY:${cleanName}
LOCATION:${cleanLocation}
DESCRIPTION:${cleanDescription} (Type: ${event.type})
END:VEVENT
`;
    });

    const icsEventString = icsEvents.join("\n");
    const icsFinalEventString = ICS_HEADER + icsEventString + ICS_FOOTER;

    return icsFinalEventString;
}