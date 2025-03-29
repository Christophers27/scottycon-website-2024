import { type NextRequest, NextResponse } from "next/server";
import webPush from "web-push";
import { neon } from "@neondatabase/serverless";
if (!process.env.DATABASE_URL) {
  throw new Error("Environment variables supplied not sufficient.");
}
const sql = neon(process.env.DATABASE_URL);

export async function notifyAll(
  title: string | undefined,
  body: string | undefined
) {
  if (
    !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
    !process.env.WEB_PUSH_EMAIL ||
    !process.env.VAPID_PRIVATE_KEY
  ) {
    throw new Error("Environment variables supplied not sufficient.");
  }
  try {
    webPush.setVapidDetails(
      `mailto:${process.env.WEB_PUSH_EMAIL}`,
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
    const rows = await sql`
      SELECT * FROM Subscriptions
      WHERE expirationTime IS NULL OR expirationTime >= NOW()
    `;

    for (let sub of rows) {
      let subscription: webPush.PushSubscription = {
        endpoint: sub.endpoint_s,
        expirationTime: sub.expirationTime,
        keys: {
          auth: sub.auth,
          p256dh: sub.p256dh,
        },
      };

      await webPush.sendNotification(
        subscription,
        JSON.stringify({
          title: title ?? "ScottyCon Alert",
          message: body ?? "Check the guide for updates!",
        })
      );
    }

    await sql`
      INSERT INTO Notifications(title, body, timeSent) VALUES(${title}, ${body}, NOW());
    `;

    return new NextResponse("Sent notifications", {
      status: 200,
    });
  } catch (err) {
    if (err instanceof webPush.WebPushError) {
      return new NextResponse(err.body, {
        status: err.statusCode,
        headers: err.headers,
      });
    }
    console.log(err);
    return new NextResponse("Failed to send notifications", {
      status: 500,
    });
  }
}
