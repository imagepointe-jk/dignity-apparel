import { easyCorsInit } from "@/constants";

export async function POST() {
  //Always send a 200 response back to WooCommerce; the webhook seems to break otherwise
  console.log("hello webhook");
  return Response.json({}, easyCorsInit);
}
