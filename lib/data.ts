import rawData from "./events.json";

export type EventType = {
  name: string;
  description: string;
  type: string; 
  startTime: string; // Format: "YYYY-MM-DDTHH:MM:SS" (24-hour format)
  endTime: string; // Format: "YYYY-MM-DDTHH:MM:SS" (24-hour format)
  location: string;
};

export const events = rawData as EventType[];