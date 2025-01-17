import { AppError } from "@/error";
import { updateCustomer } from "@/fetch/woocommerce/customers";
import { validateCustomer } from "@/types/validation/woocommerce/woocommerce";
import { message } from "@/utility/misc";
import {
  INTERNAL_SERVER_ERROR,
  NOT_AUTHENTICATED,
} from "@/utility/statusCodes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const cookiesToken = cookieStore.get("wp_jwt_auth")?.value;
  const cookiesId = cookieStore.get("wp_user_id")?.value;

  try {
    if (!cookiesToken || !cookiesId) {
      throw new AppError({
        type: "Authentication",
        httpStatus: NOT_AUTHENTICATED,
        clientMessage: "Missing token and/or user id.",
      });
    }

    const customerJson = await request.json();
    const customerParsed = validateCustomer(customerJson);
    const updateResponse = await updateCustomer(
      cookiesToken,
      cookiesId,
      customerParsed
    );
    const updateJson = await updateResponse.json();

    if (!updateResponse.ok) {
      throw new AppError({
        type: "Unknown",
        clientMessage: "Update failed.",
        httpStatus: updateResponse.status,
      });
    }

    return NextResponse.json(updateJson);
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { message: error.clientMessage },
        { status: error.httpStatus }
      );
    }
    return NextResponse.json(message("Unknown error."), {
      status: INTERNAL_SERVER_ERROR,
    });
  }
}
