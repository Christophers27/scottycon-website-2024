"use client";
import { useNotifications } from "@/context/notificationContext";

export default function SendNotification() {
  const { sendNotification, isSubscribed } = useNotifications();

  return (
    <>
      <button
        type="button"
        onClick={() => sendNotification("hi there", "i luv u")}
        disabled={!isSubscribed}
      >
        Send Notification
      </button>
    </>
  );
}
