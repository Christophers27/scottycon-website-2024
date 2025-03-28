import React from "react";
import { neon } from "@neondatabase/serverless";
import SectionHeader from "@/components/sectionHeader";
import NotificationCard from "@/components/notificationCard";
import { NotificationType } from "@/context/notificationContext";
if (!process.env.DATABASE_URL) {
  throw new Error("Environment variables supplied not sufficient.");
}
const sql = neon(process.env.DATABASE_URL);

export default async function NotificationsPage() {
  const data =
    (await sql`SELECT * FROM Notifications ORDER BY timeSent DESC`) as NotificationType[];
  return (
    <div className="flex flex-col flex-1 bg-scottycon-background rounded-t-xl p-8 text-scottycon-text items-center">
      <SectionHeader>Alerts</SectionHeader>
      <div className="flex flex-col w-full max-w-[45rem] h-[60svh] rounded-xl p-2 overflow-auto gap-5">
        {data.length == 0 ? (
          <>No alerts.</>
        ) : (
          data.map((alertRow) => (
            <NotificationCard {...alertRow} key={alertRow.id} />
          ))
        )}
      </div>
    </div>
  );
}
