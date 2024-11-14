import { getMegaMenu } from "@/fetch/prismic/prismic";
import { NavBar } from "./NavBar";
import { validateMegaMenuResponse } from "@/types/validation/prismic/validation";

export async function NavBarPrismic() {
  const megaMenuResponse = await getMegaMenu();
  const parsed = validateMegaMenuResponse(megaMenuResponse);
  //@ts-expect-error: "url" does not exist
  const specialLinkUrl = megaMenuResponse.data.special_link.url;

  return (
    <NavBar
      megaMenu={parsed}
      specialLink={
        typeof specialLinkUrl === "string"
          ? {
              href: specialLinkUrl,
              text: megaMenuResponse.data.special_link.text || "SPECIAL",
            }
          : undefined
      }
      logoImgUrls={{
        logo: megaMenuResponse.data.logo_main_image.url || "",
        text: megaMenuResponse.data.logo_text_image.url || "",
      }}
    />
  );
}
