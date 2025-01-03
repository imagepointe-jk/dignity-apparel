import { easyCorsInit } from "@/constants";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  //Always send a 200 response back to WooCommerce; the webhook seems to break otherwise
  console.log("hello webhook");
  return Response.json({}, easyCorsInit);
}
