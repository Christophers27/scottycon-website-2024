"use server";

import prisma from "@/lib/db";
import { stamp } from "@prisma/client";

export async function syncStamps(qr?: string) : Promise<stamp[]> {
  // const result = await prisma.orders.findUnique({
  //   where: {
  //     order_id: orderID,
  //   },
  // });s

  // if (!result) return null;
  // return result;
  return [{
    stamp_id: 0,
    stamp_type: 0,
    obtained: true,
    obtained_at: new Date('2025-01-15T14:23:00')
  },{
    stamp_id: 1,
    stamp_type: 0,
    obtained: true,
    obtained_at: new Date('2025-02-08T09:45:00'),
  },{
    stamp_id: 2,
    stamp_type: 0,
    obtained: true,
    obtained_at: new Date('2025-03-22T16:30:00'),
  },{
    stamp_id: 3,
    stamp_type: 0,
    obtained: false,
    obtained_at: new Date('2025-04-10T11:12:00'),
  },{
    stamp_id: 4,
    stamp_type: 0,
    obtained: true,
    obtained_at: new Date('2025-05-30T13:55:00'),
  },{
    stamp_id: 5,
    stamp_type: 0,
    obtained: false,
    obtained_at: new Date('2025-06-18T10:20:00'),
  }]; // TODO -- placeholder
}