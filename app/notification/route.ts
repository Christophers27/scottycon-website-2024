import { type NextRequest, NextResponse } from "next/server";
import webPush from "web-push";

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
  try {
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
  }
};
