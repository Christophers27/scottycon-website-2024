import React from "react";
import Link from "next/link";
import { BiSolidHome, BiSolidCalendarEvent } from "react-icons/bi";

export default function Footer() {
  return (
    <div className="bg-scottycon-foreground flex p-2 items-center justify-evenly">
      <Link className="flex flex-col items-center justify-center" href="/">
        <BiSolidHome className="size-6" />
        <p className="text-xs">Home</p>
      </Link>
      <Link className="flex flex-col items-center justify-center" href="/events">
        <BiSolidCalendarEvent className="size-6" />
        <p className="text-xs">Events</p>
      </Link>
    </div>
  );
}
