import { easyCorsInit } from "@/constants";
import { message } from "@/utility/misc";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "@/utility/statusCodes";
import { NextRequest } from "next/server";
import { trackSearchString } from "@/fetch/tracking/search";
import { queryCachedProducts } from "@/get/products";

const emptyResults: any[] = [];

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
  const pageNumber = searchParams.get("page-number");
  const pageSize = searchParams.get("page-size");

  trackQuery(search);

  try {
    const { products, pageInfo } = await queryCachedProducts({
      search,
      category,
      availability,
      fabricType,
      fabricWeight,
      features,
      fit,
      before: null,
      after: null,
      first: null,
      last: null,
      pageNumber: pageNumber ? +pageNumber : null,
      pageSize: pageSize ? +pageSize : null,
    });
    if (products.length === 0)
      return Response.json(emptyResults, {
        ...easyCorsInit,
        status: NOT_FOUND,
      });

    return Response.json({ products, pageInfo }, easyCorsInit);
  } catch (error) {
    console.error(error);
    return Response.json(message("Server error."), {
      ...easyCorsInit,
      status: INTERNAL_SERVER_ERROR,
    });
  }
}

async function trackQuery(search: string | null) {
  if (!search) return;

  try {
    const response = await trackSearchString(search);
    if (!response.ok) throw new Error();
  } catch (error) {
    console.error(`Failed to track a search string. ${error}`);
  }
}
