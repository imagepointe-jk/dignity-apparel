import { BRAND_COLOR } from "@/constants";
import { createClient } from "@/prismicio";

export function getPrismicLinkUrl(link: any) {
  if (link === undefined) return "";

  const url = link.url;
  if (!(typeof url === "string")) {
    console.error("The link has no url!");
    return "";
  }
  return url;
}

export function getPrismicObjId(obj: any) {
  if (!obj) return "";

  const id = obj.id;
  if (!(typeof id === "string")) {
    console.error("The object has no id!");
    return "";
  }
  return id;
}

//pass in the content relationship object representing the relationship with the "brand_color" document
export async function getBrandColor(relationshipObj: any) {
  if (!relationshipObj) return BRAND_COLOR;

  const id = getPrismicObjId(relationshipObj);
  const client = createClient();
  const response = await client.getByType("brand_color");
  const match = response.results.find((color) => color.id === id);
  if (!match) return "";

  return `${match.data.color}`;
}
