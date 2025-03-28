import { type NextRequest, NextResponse } from "next/server";
import { notifyAll } from "./notifyAll";
import webPush from "web-push";
import { neon } from "@neondatabase/serverless";
if (!process.env.DATABASE_URL) {
  throw new Error("Environment variables supplied not sufficient.");
}
const sql = neon(process.env.DATABASE_URL);

export const GET = async (req: NextRequest) => {
  let data = await sql`SELECT * FROM Notifications ORDER BY timeSent DESC`;
  return new NextResponse(JSON.stringify({ data: data }), {
    status: 200,
  });
};

export const POST = async (req: NextRequest) => {
  if (
    !process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ||
    !process.env.WEB_PUSH_EMAIL ||
    !process.env.VAPID_PRIVATE_KEY
  ) {
    throw new Error("Environment variables supplied not sufficient.");
  }
  const { subscription, notificationTitle, notificationMessage } =
    (await req.json()) as {
      subscription: webPush.PushSubscription;
      notificationTitle: string | undefined;
      notificationMessage: string | undefined;
    };
  return await notifyAll(notificationTitle, notificationMessage);
  /*try {
    webPush.setVapidDetails(
      `mailto:${process.env.WEB_PUSH_EMAIL}`,
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
    const response = await webPush.sendNotification(
      subscription,
      JSON.stringify({
        title: notificationTitle ?? "ScottyCon Alert",
        message: notificationMessage ?? "Check the guide for updates!",
      })
    );
    return new NextResponse(response.body, {
      status: response.statusCode,
      headers: response.headers,
    });
  } catch (err) {
    if (err instanceof webPush.WebPushError) {
      return new NextResponse(err.body, {
        status: err.statusCode,
        headers: err.headers,
      });
    }
    console.log(err);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }*/
};
