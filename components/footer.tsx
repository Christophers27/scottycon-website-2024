import Link from "next/link";
import {
  BiSolidHome,
  BiSolidCalendarEvent,
  BiSolidBell,
} from "react-icons/bi";
import React, { JSX } from "react";

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
      {linkButton(
        "/events",
        <BiSolidCalendarEvent className="text-2xl" />,
        "Events"
      )}
      {/* {linkButton("/map", <BiSolidCalendarEvent className="text-2xl" />, "Map")} */}
      {linkButton(
        "/notifications",
        <BiSolidBell className="text-2xl" />,
        "Alerts"
      )}
    </footer>
  );
}
