"use client";

import { useState, useEffect } from "react";
import { type stamp } from "@prisma/client";
import { useZxing } from "react-zxing";
import { syncStamps } from "@/app/actions";

// Initialize with 6 empty stamp slots
const initialStamps: stamp[] = Array.from({ length: 6 }, (_, k) => ({
  stamp_id: k,
  stamp_type: 0,
  obtained: false,
  obtained_at: new Date(),
}));

export default function RaffleScanner() {
  const [paused, setPaused] = useState(true);
  const [stamps, setStamps] = useState<stamp[]>(initialStamps);

  // Fetch stamps on component mount
  useEffect(() => {
    const fetchStamps = async () => {
      try {
        const fetchedStamps = await syncStamps();
        setStamps(fetchedStamps);
      } catch (error) {
        console.error("Failed to fetch stamps:", error);
      }
    };

    fetchStamps();
  }, []);

  const { ref } = useZxing({
    onDecodeResult(result) {
      syncStamps(result.getText()).then((res: stamp[]) => {
        setStamps(res);
      });
    },
    paused,
    timeBetweenDecodingAttempts: 100, // milliseconds after scanning, before scanning again
  });

  return (
    <div className="flex flex-col items-center border border-black/5 rounded-lg bg-gray-100 p-2 gap-4">
      <video
        ref={ref}
        width="320"
        height="240"
        className="bg-gray-200 rounded-lg border border-black/10"
      />
      <div className="flex gap-4">
        <button
          className="rounded-full py-2 px-4 font-semibold border bg-white border-black/10"
          onClick={() => setPaused(false)}
        >
          Start Scanning
        </button>
        <button
          className="rounded-full py-2 px-4 font-semibold border bg-white border-black/10"
          onClick={() => setPaused(true)}
        >
          Stop Scanning
        </button>
      </div>
      <div className="flex flex-col items-center w-full bg-white border border-black/10 p-2 rounded-lg">
        <h1 className="font-medium text-xl my-2">Your Stamps</h1>
        <div className="grid grid-cols-2 w-full my-1 gap-4">
          {stamps.map((stamp) => (
            <div key={stamp.stamp_id} className="text-center">
              <h2>Stamp {stamp.stamp_id}</h2>
              <span className="text-sm">Obtained at: {stamp.obtained ? stamp.obtained_at.toLocaleString() : "Not yet obtained"}</span>
              <img src={stamp.obtained ? "/stamp_ph.png" : "/temp.png"} className="rounded-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
