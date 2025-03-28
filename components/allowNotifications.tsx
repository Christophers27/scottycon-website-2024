"use client";
import { useNotifications } from "@/context/notificationContext";

export default function AllowNotifications() {
  const { isSubscribed, registration, allowNotifications } = useNotifications();
  if (isSubscribed || !registration) {
    return <></>;
  }

  return (
    <>
      <button
        type="button"
        onClick={allowNotifications}
        // disabled={!isSubscribed}
      >
        Allow Notifications
      </button>
    </>
  );
}
