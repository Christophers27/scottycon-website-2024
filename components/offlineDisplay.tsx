"use client";
import useNetworkStatus from "@/hooks/useNetworkStatus";

export default function OfflineDisplay() {
  const { isOnline } = useNetworkStatus();
  if (!isOnline) {
    return <div>App is offline. Information might be out of date.</div>;
  } else {
    return <></>;
  }
}
