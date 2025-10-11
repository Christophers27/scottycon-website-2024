"use client";

import { useState } from "react";
import { type orders } from "@prisma/client";
import { useZxing } from "react-zxing";
import { checkInOrder, checkOutOrder, getOrder } from "@/app/actions";

export default function QRScanner() {
  const [paused, setPaused] = useState(true);
  const [order, setOrder] = useState<null | orders>(null);

  const { ref } = useZxing({
    onDecodeResult(result) {
      getOrder(result.getText()).then((res) => {
        setOrder(res);
      });
    },
    paused,
    timeBetweenDecodingAttempts: 100, // milliseconds after scanning, before scanning again
  });

  function checkIn() {
    if (order) {
      checkInOrder(order.order_id).then((res) => {
        setOrder(res);
      });
    }
  }

  function checkOut() {
    if (order) {
      checkOutOrder(order.order_id).then((res) => {
        setOrder(res);
      });
    }
  }

  return (
    <div className="flex flex-col items-center border border-black/5 rounded-lg bg-gray-100 p-2 gap-4">
      <video
        ref={ref}
        width="320"
        height="240"
        className="bg-black rounded-lg"
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
        <h1 className="font-medium text-xl">Order Info</h1>
        <div className="h-1 bg-gray-200 w-full my-1 rounded-full"></div>
        {order ? (
          <div className="flex flex-col gap-2">
            <div className="flex">
              <div>
                <p className="font-semibold">Order ID:</p>
                <p className="font-semibold">Name:</p>
                <p className="font-semibold">Tickets:</p>
                <p className="font-semibold">Checked In:</p>
              </div>
              <div className="ml-4">
                <p>{order.order_id}</p>
                <p>{order.shippingfirstname} {order.shippinglastname}</p>
                <p>{order.productquantity}</p>
                <p>{order.checkedin}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="rounded-full py-2 px-4 font-semibold border bg-white border-black/10"
                onClick={checkIn}
              >
                Check In
              </button>
              <button
                className="rounded-full py-2 px-4 font-semibold border bg-white border-black/10"
                onClick={checkOut}
              >
                Check Out
              </button>
            </div>
          </div>
        ) : (
          <p>No order found!</p>
        )}
      </div>
    </div>
  );
}
