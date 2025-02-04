import { AppError } from "@/error";
import { updateCartQuantities } from "@/fetch/woocommerce/cart";
import { validateCartQuantityUpdate } from "@/types/validation/woocommerce/woocommerce";
import { message } from "@/utility/misc";
import {
  INTERNAL_SERVER_ERROR,
  NOT_AUTHENTICATED,
} from "@/utility/statusCodes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("wp_jwt_auth")?.value;

    if (!token)
      throw new AppError({
        type: "Client Request",
        httpStatus: NOT_AUTHENTICATED,
        clientMessage: "No token provided.",
      });

    const requestJson = await request.json();
    const requestParsed = validateCartQuantityUpdate(requestJson);

    const updateResponse = await updateCartQuantities(token, requestParsed);
    const updateJson = await updateResponse.json();

    if (updateJson.errors && updateJson.errors.length > 0)
      throw new AppError({
        type: "Unknown",
        serverMessage: `WPGraphQL errors while updating cart: ${JSON.stringify(updateJson.errors)}`,
        clientMessage: "Cart update failed",
        httpStatus: INTERNAL_SERVER_ERROR,
      });

    const response = NextResponse.json({
      newSubtotal: updateJson.data.updateItemQuantities.cart.subtotal,
    });
    const newToken = updateResponse.headers.get("x-jwt-auth");
    if (newToken)
      response.cookies.set("wp_jwt_auth", newToken, { httpOnly: true });

    return response;
  } catch (error) {
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
}
