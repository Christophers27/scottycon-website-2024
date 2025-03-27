import Link from "next/link";
import React, { JSX } from "react";
import { BiSolidCalendarEvent, BiSolidHome } from "react-icons/bi";

export default function Footer() {
  function linkButton(link: string, icon: JSX.Element, text: string) {
    return (
      <Link href={link}>
        <div className="flex flex-col items-center justify-center hover:scale-110 hover:text-scottycon-pink active:scale-95 active:text-scottycon-pink transition ">
          {icon}
          <p className="text-xs">{text}</p>
        </div>
      </Link>
    );
  }

  return (
    <footer className="flex p-2 items-center justify-evenly sticky bottom-0 bg-white">
      {linkButton("/", <BiSolidHome className="text-2xl" />, "Home")}
      {linkButton("/events", <BiSolidCalendarEvent className="text-2xl" />, "Events")}
      {linkButton("/map", <BiSolidCalendarEvent className="text-2xl" />, "Map")}
    </footer>
  );
}
