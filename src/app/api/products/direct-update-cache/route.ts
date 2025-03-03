import { env } from "@/env";
import { AppError } from "@/error";
import { validateWooCommerceProductsGraphQLResponse } from "@/types/validation/woocommerce/woocommerce";
import { getDevPassword } from "@/utility/api";
import { message } from "@/utility/misc";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_AUTHENTICATED,
} from "@/utility/statusCodes";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

//? Sometimes the automatic webhook-activated cache update fails for unknown reasons.
//? Use this route to directly upload raw product JSON and forcibly overwrite the current cache.
//? Obtain the JSON from your own GraphQL request, via Postman etc.

const redis = await createClient({
  url: env.REDIS_URL,
})
  .on("error", (err) => console.error(`Redis Error: ${err}`))
  .connect();

export async function POST(request: NextRequest) {
  try {
    if (request.headers.get("Content-Type") !== "application/json")
      throw new AppError({
        type: "Client Request",
        clientMessage: "Wrong content type.",
        httpStatus: BAD_REQUEST,
      });

    if (getDevPassword(request) !== env.DEVELOPER_PASSWORD)
      throw new AppError({
        type: "Authentication",
        clientMessage: "Invalid credentials.",
        httpStatus: NOT_AUTHENTICATED,
      });

    const json = await request.json();
    validateWooCommerceProductsGraphQLResponse(json);

    await redis.setEx(
      env.REDIS_CACHE_KEY,
      env.SIMPLE_CACHE_TIME / 1000,
      JSON.stringify(json)
    );

    console.log("Direct cache update complete.");
    return NextResponse.json({ message: "Direct cache update complete." });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(message(error.clientMessage), {
        status: error.httpStatus,
      });
    }
    return NextResponse.json(message("Unknown error."), {
      status: INTERNAL_SERVER_ERROR,
    });
  }
}
