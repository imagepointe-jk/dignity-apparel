import { easyCorsInit } from "@/constants";
import { NextRequest } from "next/server";
import { getCachedProducts } from "../simpleCache";
import { env } from "@/env";

export async function POST(request: NextRequest) {
  const webhookResource = request.headers.get("x-wc-webhook-resource");
  const webhookEvent = request.headers.get("x-wc-webhook-event");

  if (
    webhookResource === "product" &&
    ["created", "updated", "deleted"].includes(`${webhookEvent}`)
  ) {
    getCachedProducts(true);
  } else {
    console.log("unrecognized", webhookResource, webhookEvent);
    const authorization = request.headers.get("Authorization");
    const split = authorization?.split(" ");
    const givenPassword = split ? split[1] : undefined;
    const decoded = givenPassword ? atob(givenPassword) : undefined;
    const decodedSplit = decoded?.split(":");
    if (decodedSplit && decodedSplit[1] === env.DEVELOPER_PASSWORD) {
      getCachedProducts(true);
    }
  }

  //Always send a 200 response back to WooCommerce; the webhook seems to break otherwise
  return Response.json({}, easyCorsInit);
}
