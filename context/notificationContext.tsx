"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type NotificationContextType = {
  allowNotifications: () => Promise<void>;
  isSubscribed: boolean;
  subscription: PushSubscription | null;
  registration: ServiceWorkerRegistration | null;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const base64ToUint8Array = (base64: string) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export type NotificationType = {
  title: string;
  body: string;
  timesent: string;
  id: number;
};

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [deniedNotifications, setDeniedNotifications] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.serwist !== undefined &&
      deniedNotifications === false
    ) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager?.getSubscription().then((sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  // subscribe to notifications
  useEffect(() => {
    // don't subscribe if you can't or if you're already subscribed
    if (!registration || isSubscribed || deniedNotifications) {
      return;
    }
    allowNotifications();
  }, [registration, isSubscribed]);

  async function allowNotifications() {
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
      throw new Error("Environment variables supplied not sufficient.");
    }
    const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY; // needed this extra step for type checking
    if (!registration) {
      console.error("No SW registration available.");
      return;
    }
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    Notification.requestPermission().then(async (permission) => {
      if (permission === "granted") {
        // ... subscribe to push notifications
        const sub = await registration.pushManager?.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8Array(key),
        });
        // TODO: read result of fetch and try again if it fails
        fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(sub),
          signal: AbortSignal.timeout(10000),
        });
        setSubscription(sub);
        setIsSubscribed(true);
      } else if (permission === "denied") {
        setDeniedNotifications(true);
      }
    });
  }

  return (
    <NotificationContext.Provider
      value={{
        isSubscribed,
        subscription,
        registration,
        allowNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
}

/*

  // TODO: remove this
  function sendNotification(title: string = "ScottyCon Alert", body: string) {
    if (!subscription) {
      // todo: remove this alert when this function gets removed
      alert("Web push not subscribed");
      if (!deniedNotifications) {
        allowNotifications();
      }
      return;
    }
    fetch("/api/notification", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        subscription,
        notificationTitle: title,
        notificationMessage: body,
      }),
      signal: AbortSignal.timeout(10000),
    }).catch((err) => {
      if (err instanceof Error) {
        if (err.name === "TimeoutError") {
          console.error("Timeout: It took too long to get the result.");
        } else if (err.name === "AbortError") {
          console.error(
            "Fetch aborted by user action (browser stop button, closing tab, etc.)"
          );
        } else if (err.name === "TypeError") {
          console.error("The AbortSignal.timeout() method is not supported.");
        } else {
          // A network error, or some other problem.
          console.error(`Error: type: ${err.name}, message: ${err.message}`);
        }
      } else {
        console.error(err);
      }
      alert("An error happened.");
    });
  }
    */
