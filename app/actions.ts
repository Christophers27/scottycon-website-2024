"use server";

import prisma from "@/lib/prisma";

export async function sendReport(title: string, description: string) {
  try {
    await prisma.bugReport.create({
      data: {
        title,
        description,
      },
    });

    return true;
  } catch (error) {
    console.error("Error saving bug report:", error);
    return false;
  }
}