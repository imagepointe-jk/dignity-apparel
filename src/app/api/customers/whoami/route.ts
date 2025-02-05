import { AppError } from "@/error";
import { getUser } from "@/fetch/wordpress/wordpress";
import { basicApiErrorHandling } from "@/utility/api";
import { NOT_AUTHENTICATED } from "@/utility/statusCodes";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("wp_jwt_auth")?.value;
    const id = cookieStore.get("wp_user_id")?.value;

    if (!token || !id)
      throw new AppError({
        type: "Authentication",
        clientMessage: "Not authenticated",
        httpStatus: NOT_AUTHENTICATED,
      });

    const userResponse = await getUser(token, id);
    const newToken = userResponse.headers.get("x-jwt-auth");
    const userJson = await userResponse.json();

    const response = NextResponse.json(userJson);
    if (newToken)
      response.cookies.set("wp_jwt_auth", newToken, { httpOnly: true });

    return response;
  } catch (error) {
    console.error(error);
    return basicApiErrorHandling(error);
  }
}
