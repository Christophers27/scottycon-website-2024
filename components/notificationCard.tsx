"use client";

import React from "react";

type notificationCardProps = {
  title: string;
  body: string;
  timesent: string;
};

export default function NotificationCard({
  title,
  body,
  timesent,
}: notificationCardProps) {
  return (
    <div className="flex rounded-xl bg-scottycon-foreground">
      <div className="flex flex-col basis-1/5 align-top items-end px-1 py-2">
        <p className="font-semibold">
          {new Date(timesent).toLocaleTimeString()}
        </p>
      </div>
      <div className="flex flex-col items-start basis-4/5 px-2 py-2 border-b border-black/10">
        <div className="flex align-top gap-1 w-full">
          <h2 className="font-semibold">{title}</h2>
        </div>
        <div className="flex flex-col items-start pt-1">
          <p className="text-scottycon-text text-sm">{body}</p>
        </div>
      </div>
    </div>
  );
}
