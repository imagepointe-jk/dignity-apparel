import { BRAND_COLOR } from "@/constants";
import { createClient } from "@/prismicio";
import { Simplify } from "../../prismicio-types";
import { Content } from "@prismicio/client";
import { LinkAsButtonData } from "@/components/global/LinkAsButton/LinkAsButton";
import { getButtonStyle } from "@/fetch/prismic/prismic";
import { validateButtonStyleResponse } from "@/types/validation/prismic/validation";

export function getPrismicLinkUrl(link: any) {
  if (link === undefined) return "";

  const url = link.url;
  if (!(typeof url === "string")) {
    return "";
  }
  return url;
}

export function getPrismicObjId(obj: any) {
  if (!obj) return "";

  const id = obj.id;
  if (!(typeof id === "string")) {
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

export async function convertButton(
  button: Simplify<Content.HeroSliceDefaultPrimaryButtonsItem> | undefined
): Promise<LinkAsButtonData> {
  //@ts-expect-error: "id" does not exist
  const styleId = button?.button_style.id;

  //start out with default data
  const converted: LinkAsButtonData = {
    href: "",
    label: "Link",
    states: {
      hover: {
        primaryColor: "ffffff",
        secondaryColor: BRAND_COLOR,
      },
      normal: {
        primaryColor: BRAND_COLOR,
        secondaryColor: "ffffff",
      },
    },
  };
  if (!button || !styleId) {
    return converted; //return the default as fallback
  }

  const response = await getButtonStyle(styleId);
  const {
    data: {
      hover_primary_color,
      hover_secondary_color,
      primary_color,
      secondary_color,
      full_width,
      type,
    },
  } = validateButtonStyleResponse(response);

  converted.href = getPrismicLinkUrl(button.link);
  converted.label = button.link.text || "Link";
  converted.fullWidth = full_width;
  converted.type =
    type === "Filled" ? "filled" : type === "Outlined" ? "outlined" : undefined;
  if (primary_color.data)
    converted.states.normal.primaryColor = primary_color.data.color;
  if (secondary_color.data)
    converted.states.normal.secondaryColor = secondary_color.data.color;
  if (hover_primary_color.data)
    converted.states.hover.primaryColor = hover_primary_color.data.color;
  if (hover_secondary_color.data)
    converted.states.hover.secondaryColor = hover_secondary_color.data.color;

  return converted;
}
