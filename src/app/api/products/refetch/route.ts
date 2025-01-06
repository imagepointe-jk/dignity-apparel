import { easyCorsInit } from "@/constants";
import { NextRequest } from "next/server";
import { getCachedProducts } from "../simpleCache";

export async function POST(request: NextRequest) {
  const webhookResource = request.headers.get("x-wc-webhook-resource");
  const webhookEvent = request.headers.get("x-wc-webhook-event");

  if (
    webhookResource === "product" &&
    ["created", "updated", "deleted"].includes(`${webhookEvent}`)
  ) {
    console.log(`${webhookResource} event "${webhookEvent}" from WC`);
    getCachedProducts();
  } else {
    console.log("unrecognized combo:", webhookResource, webhookEvent);
  }

  //Always send a 200 response back to WooCommerce; the webhook seems to break otherwise
  return Response.json({}, easyCorsInit);
}
