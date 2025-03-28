import { type NextRequest, NextResponse } from "next/server";
import webPush from "web-push";
import { neon } from "@neondatabase/serverless";
if (!process.env.DATABASE_URL) {
  throw new Error("Environment variables supplied not sufficient.");
}
const sql = neon(process.env.DATABASE_URL);

export const POST = async (req: NextRequest) => {
  const subscription = (await req.json()) as webPush.PushSubscription;
  if (subscription == undefined) {
    return new NextResponse("No subscribed provided", {
      status: 200,
    });
  }
  try {
    await sql`
    INSERT INTO Subscriptions(endpoint_s, expirationTime, p256dh, auth)
    VALUES(${subscription.endpoint}, ${subscription.expirationTime}, ${subscription.keys.p256dh}, ${subscription.keys.auth})
    ON CONFLICT DO NOTHING
  `;
    return new NextResponse("Subscribed to notifications", {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Failed to subscribe to notifications", {
      status: 500,
    });
  }
};
