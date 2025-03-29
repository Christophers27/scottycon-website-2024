"use client";
import { useNotifications } from "@/context/notificationContext";
import { BsBellFill, BsBellSlash } from "react-icons/bs";

export default function AllowNotifications() {
  const { isSubscribed, registration, allowNotifications } = useNotifications();
  // if (isSubscribed || !registration) {
  //   return <></>;
  // }

  return (
    <>
      <button
        type="button"
        onClick={allowNotifications}
        // disabled={!isSubscribed}
        className="fixed top-0 left-0 z-50 m-4 p-2 bg-scottycon-pink/90 text-white rounded-full shadow-lg hover:scale-105 active:scale-95 transition"
      >
        {isSubscribed || !registration ? (
          <BsBellSlash className="text-2xl" />
        ) : (
          <BsBellFill className="text-2xl" />
        )}
      </button>
    </>
  );
}
