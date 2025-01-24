import { easyCorsInit } from "@/constants";
import { message } from "@/utility/misc";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "@/utility/statusCodes";
import { NextRequest } from "next/server";
import { queryCachedProducts } from "./simpleCache";
import { trackSearchString } from "@/fetch/tracking/search";

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

  trackQuery(search);

  try {
    const products = await queryCachedProducts({
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
    });
    if (products.length === 0)
      return Response.json(emptyResults, {
        ...easyCorsInit,
        status: NOT_FOUND,
      });

    return Response.json(products, easyCorsInit);
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
    console.error("Failed to track a search string.");
  }
}
