import { BRAND_COLOR } from "@/constants";
import { createClient } from "@/prismicio";
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

export async function convertButton(button: {
  link: any;
  button_style: any;
}): Promise<LinkAsButtonData> {
  //start out with default data
  const buttonData: LinkAsButtonData = {
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
  //return default as fallback
  if (!button) return buttonData;

  const styleId = button?.button_style?.id;
  const href = getPrismicLinkUrl(button.link);
  const label = button?.link?.text || "Link";

  if (!styleId) return buttonData;

  const response = await getButtonStyle(styleId);
  const {
    data: {
      hover_primary_color,
      hover_secondary_color,
      primary_color,
      secondary_color,
      extra_padding,
      type,
    },
  } = validateButtonStyleResponse(response);

  buttonData.href = href;
  buttonData.label = label;
  buttonData.extraPadding = extra_padding || false;
  buttonData.type =
    type === "Filled" ? "filled" : type === "Outlined" ? "outlined" : undefined;
  if (primary_color.data)
    buttonData.states.normal.primaryColor = primary_color.data.color;
  if (secondary_color.data)
    buttonData.states.normal.secondaryColor = secondary_color.data.color;
  if (hover_primary_color.data)
    buttonData.states.hover.primaryColor = hover_primary_color.data.color;
  if (hover_secondary_color.data)
    buttonData.states.hover.secondaryColor = hover_secondary_color.data.color;

  return buttonData;
}
