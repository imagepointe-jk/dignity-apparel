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
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: null,
        endCursor: null,
      },
    },
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search");
  const category = searchParams.get("category");
  const availability = searchParams.get("availability");
  const fabricType = searchParams.getAll("fabric-type");
  const fabricWeight = searchParams.getAll("fabric-weight");
  const features = searchParams.getAll("feature");
  const fit = ["mens", "womens"].includes(`${searchParams.get("fit")}`)
    ? searchParams.get("fit")
    : null;
  const beforeParam = searchParams.get("before");
  const afterParam = searchParams.get("after");
  const firstParam = searchParams.get("first");
  const lastParam = searchParams.get("last");
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
      availability,
      fabricType,
      fabricWeight,
      features,
      fit,
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
