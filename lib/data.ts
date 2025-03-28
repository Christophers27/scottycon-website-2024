import rawData from "./events.json";

export const events = rawData as {
  name: string;
  description: string;
  type: string; 
  startTime: string; // Format: "YYYY-MM-DDTHH:MM:SS" (24-hour format)
  endTime: string; // Format: "YYYY-MM-DDTHH:MM:SS" (24-hour format)
  location: string;
}[];