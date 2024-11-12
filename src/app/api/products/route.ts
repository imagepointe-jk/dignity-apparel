import { easyCorsInit } from "@/constants";
import { searchProducts } from "@/fetch/woocommerce/products";
import { validateWooCommerceProductsResponse } from "@/types/validation/woocommerce/woocommerce";
import { message } from "@/utility/misc";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} from "@/utility/statusCodes";
import { NextRequest } from "next/server";

const emptyResults = {
  data: {
    products: {
      nodes: [],
    },
  },
};

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");
  if (!search)
    return Response.json(emptyResults, {
      ...easyCorsInit,
      status: BAD_REQUEST,
    });

  try {
    const response = await searchProducts(search);
    const json = await response.json();
    const parsed = validateWooCommerceProductsResponse(json);
    if (parsed.length === 0)
      return Response.json(emptyResults, {
        ...easyCorsInit,
        status: NOT_FOUND,
      });

    return Response.json(json, easyCorsInit);
  } catch (error) {
    console.error(error);
    return Response.json(message("Server error."), {
      ...easyCorsInit,
      status: INTERNAL_SERVER_ERROR,
    });
  }
}