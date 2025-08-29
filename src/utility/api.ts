import { AppError } from "@/error";
import { message } from "./misc";
import { NextResponse } from "next/server";
import { INTERNAL_SERVER_ERROR, NOT_AUTHENTICATED } from "./statusCodes";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export function basicApiErrorHandling(error: unknown) {
  if (error instanceof AppError) {
    if (error.serverMessage) console.error(error.serverMessage);
    return NextResponse.json(message(error.clientMessage), {
      status: error.httpStatus,
    });
  } else {
    return NextResponse.json(message("Unknown error."), {
      status: INTERNAL_SERVER_ERROR,
    });
  }
}

export async function getTokenOrThrow() {
  const cookieStore = await cookies();
  const token = cookieStore.get("wp_jwt_auth")?.value;

  if (!token)
    throw new AppError({
      type: "Client Request",
      httpStatus: NOT_AUTHENTICATED,
      clientMessage: "No token provided.",
    });

  return token;
}

export function getDevPassword(request: NextRequest) {
  const authorization = request.headers.get("Authorization");
  const split = authorization?.split(" ");
  const givenPassword = split ? split[1] : undefined;
  const decoded = givenPassword ? atob(givenPassword) : undefined;
  const decodedSplit = decoded?.split(":");
  return decodedSplit ? decodedSplit[1] : undefined;
}
