import { getAnnouncementBanner, getMegaMenu } from "@/fetch/prismic/prismic";
import { NavBar } from "./NavBar";
import {
  validateAnnouncementBannerResponse,
  validateMegaMenuResponse,
} from "@/types/validation/prismic/validation";
import { PrismicRichText } from "@prismicio/react";

export async function NavBarPrismic() {
  const megaMenuResponse = await getMegaMenu();
  const parsedMegaMenu = validateMegaMenuResponse(megaMenuResponse);
  const announcementBannerResponse = await getAnnouncementBanner();
  const parsedAnnouncementBanner = validateAnnouncementBannerResponse(
    announcementBannerResponse
  );
  //@ts-expect-error: "url" does not exist
  const specialLinkUrl = megaMenuResponse.data.special_link.url;

  return (
    <NavBar
      announcementBanner={
        parsedAnnouncementBanner.showBanner
          ? {
              bodyNode: (
                <PrismicRichText field={parsedAnnouncementBanner.text} />
              ),
              link: parsedAnnouncementBanner.link.href
                ? {
                    href: `${parsedAnnouncementBanner.link.href}`,
                    label: parsedAnnouncementBanner.link.label,
                  }
                : undefined,
            }
          : undefined
      }
      megaMenu={parsedMegaMenu}
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
