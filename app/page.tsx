import React from "react";
import { events } from "@/lib/data";
import EventCard from "@/components/eventCard";
import Events from "@/components/events";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Events />
    </div>
  );
}
