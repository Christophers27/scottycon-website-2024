"use server";

import prisma from "@/lib/db";

export async function getOrder(orderID: string) {
  const result = await prisma.orders.findUnique({
    where: {
      order_id: orderID,
    },
  });

  if (!result) return null;
  return result;
}

export async function checkInOrder(orderID: string) {
  try {
    const result = await prisma.orders.update({
      where: {
        order_id: orderID,
      },
      data: {
        checkedin: { increment: 1 },
      },
    });

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function checkOutOrder(orderID: string) {
  try {
    const result = await prisma.orders.update({
      where: {
        order_id: orderID,
      },
      data: {
        checkedin: { decrement: 1 },
      },
    });

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
