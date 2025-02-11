import { AppError } from "@/error";
import { removeFromCart } from "@/fetch/woocommerce/cart";
import { basicApiErrorHandling, getTokenOrThrow } from "@/utility/api";
import { INTERNAL_SERVER_ERROR } from "@/utility/statusCodes";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ key: string }>;
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { key } = await params;
    const token = await getTokenOrThrow();

    const response = await removeFromCart(token, key);
    const json = await response.json();

    if (json.errors && json.errors.length > 0)
      throw new AppError({
        type: "Unknown",
        serverMessage: `WPGraphQL errors while updating cart: ${JSON.stringify(json.errors)}`,
        clientMessage: "Failed to remove product",
        httpStatus: INTERNAL_SERVER_ERROR,
      });

    return NextResponse.json({
      newSubtotal: json.data.removeItemsFromCart.cart.subtotal,
    });
  } catch (error) {
    return basicApiErrorHandling(error);
  }
}
