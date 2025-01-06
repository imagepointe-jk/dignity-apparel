import { easyCorsInit } from "@/constants";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const webhookResource = request.headers.get("x-wc-webhook-source");
  const webhookEvent = request.headers.get("x-wc-webhook-event");

  if (
    webhookResource === "product" &&
    ["created", "updated", "deleted"].includes(`${webhookEvent}`)
  ) {
    console.log(`${webhookResource} event "${webhookEvent}" from WC`);
  }

  //Always send a 200 response back to WooCommerce; the webhook seems to break otherwise
  return Response.json({}, easyCorsInit);
}
