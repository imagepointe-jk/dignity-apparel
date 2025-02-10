import { AppError } from "@/error";
import { addToCart } from "@/fetch/woocommerce/cart";
import { basicApiErrorHandling, getTokenOrThrow } from "@/utility/api";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "@/utility/statusCodes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const token = await getTokenOrThrow();
    const json = await request.json();
    const productId = +json.productId;
    const variationId = +json.variationId;
    const quantity = +json.quantity;
    if (isNaN(productId) || isNaN(variationId) || isNaN(quantity))
      throw new AppError({
        type: "Client Request",
        clientMessage: "Invalid input",
        httpStatus: BAD_REQUEST,
      });

    const addResponse = await addToCart(
      token,
      productId,
      variationId,
      quantity
    );
    if (!addResponse.ok)
      throw new AppError({
        type: "Unknown",
        clientMessage: "Add to cart failed",
        httpStatus: addResponse.status,
      });
    const addJson = await addResponse.json();
    if (addJson.errors && addJson.errors.length > 0)
      throw new AppError({
        type: "Unknown",
        serverMessage: `WPGraphQL errors while updating cart: ${JSON.stringify(json.errors)}`,
        clientMessage: "Add to cart failed",
        httpStatus: INTERNAL_SERVER_ERROR,
      });

    return NextResponse.json(addJson);
  } catch (error) {
    return basicApiErrorHandling(error);
  }
}
