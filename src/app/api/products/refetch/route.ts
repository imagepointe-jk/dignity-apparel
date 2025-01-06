import { easyCorsInit } from "@/constants";
import { NextRequest } from "next/server";
import { getCachedProducts } from "../simpleCache";
import { env } from "@/env";
import { message } from "@/utility/misc";
import { FORBIDDEN } from "@/utility/statusCodes";

export async function POST(request: NextRequest) {
  const webhookResource = request.headers.get("x-wc-webhook-resource");
  const webhookEvent = request.headers.get("x-wc-webhook-event");

  if (
    webhookResource === "product" &&
    ["created", "updated", "deleted"].includes(`${webhookEvent}`)
  ) {
    getCachedProducts(true);
  } else {
    const authorization = request.headers.get("Authorization");
    const split = authorization?.split(" ");
    const givenPassword = split ? split[1] : undefined;
    const decoded = givenPassword ? atob(givenPassword) : undefined;
    const decodedSplit = decoded?.split(":");
    if (decodedSplit && decodedSplit[1] === env.DEVELOPER_PASSWORD) {
      getCachedProducts(true);
    } else {
      return Response.json(message("Invalid password."), {
        ...easyCorsInit,
        status: FORBIDDEN,
      });
    }
  }

  //Always send a 200 response back to WooCommerce; the webhook seems to break otherwise
  return Response.json({}, easyCorsInit);
}
