import { easyCorsInit } from "@/constants";
import { queryProducts } from "@/fetch/woocommerce/products";
import {
  validatePagination,
  validateWooCommerceProductsResponse,
} from "@/types/validation/woocommerce/woocommerce";
import { message } from "@/utility/misc";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "@/utility/statusCodes";
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
  const category = request.nextUrl.searchParams.get("category");
  const beforeParam = request.nextUrl.searchParams.get("before");
  const afterParam = request.nextUrl.searchParams.get("after");
  const firstParam = request.nextUrl.searchParams.get("first");
  const lastParam = request.nextUrl.searchParams.get("last");
  const { after, before, first, last } = validatePagination({
    before: beforeParam,
    after: afterParam,
    first: firstParam ? +firstParam : null,
    last: lastParam ? +lastParam : null,
  });

  try {
    const response = await queryProducts({
      search,
      category,
      before,
      after,
      first,
      last,
    });
    const json = await response.json();
    const parsed = validateWooCommerceProductsResponse(json);
    if (parsed.products.length === 0)
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
