"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type NotificationContextType = {
  sendNotification: (title: string, body: string) => void; //TODO remove this
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

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.serwist !== undefined
    ) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
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
    if (!registration || isSubscribed) {
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
    Notification.requestPermission().then(async (permission) => {
      if (permission === "granted") {
        // ... subscribe to push notifications
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8Array(key),
        });
        // TODO: you should call your API to save subscription data on the server in order to send web push notification from the server
        setSubscription(sub);
        setIsSubscribed(true);
      }
    });
  }

  // TODO: remove this
  function sendNotification(title: string = "ScottyCon Alert", body: string) {
    if (!subscription) {
      // todo: remove this alert when this function gets removed
      alert("Web push not subscribed");
      return;
    }
    fetch("/notification", {
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

  return (
    <NotificationContext.Provider
      value={{ isSubscribed, subscription, sendNotification, registration }}
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
