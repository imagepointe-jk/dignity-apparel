import { footerSchema } from "@/types/schema/footer";
import { megaMenuSchema } from "@/types/schema/navbar";
import { buttonStyleResponseSchema } from "@/types/schema/prismic";
import { RichTextField } from "@prismicio/client";

export function validateAnnouncementBannerResponse(response: any) {
  return {
    showBanner: !!response.data.show_banner,
    text: response.data.text as RichTextField, //not aware of an easy way to actually parse this
    link: {
      href: response.data.link.url ? `${response.data.link.url}` : undefined,
      label: `${response.data.link.text}`,
    },
  };
}

export function validateMegaMenuResponse(response: any) {
  return megaMenuSchema.parse({
    items: response.data.navigation.map((item: any) => {
      return {
        label: item.mega_menu_item.data.label || "Label",
        href: item.mega_menu_item.data.url || "",
        sections: item.mega_menu_item.data.sections.map((item: any) => {
          return {
            title: item.section.data.title || "",
            links: item.section.data.links.map((item: any) => ({
              label: item.link.text || "Link",
              href: item.link.url || "",
            })),
          };
        }),
        featured: item.mega_menu_item.data.featured_images.map((item: any) => ({
          caption: item.featured_image.data.caption || "",
          imageUrl: item.featured_image.data.image.url || "",
          imageAlt: item.featured_image.data.image.alt || "image",
          href: item.featured_image.data.link.url || "",
          hoverText: item.featured_image.data.hover_text || "",
        })),
      };
    }),
  });
}

export function validateFooterResponse(response: any) {
  return footerSchema.parse({
    sections: response.data.footer_sections.map((item: any) => {
      return {
        title: item.section.data.title,
        links: item.section.data.links.map((item: any) => {
          return {
            displayText: item.link.text || "Link",
            href: item.link.url,
          };
        }),
      };
    }),
    iconLinks: response.data.footer_icon_links.map((item: any) => {
      return {
        href: item.link.url,
      };
    }),
    homeLinkImageUrl: response.data.footer_home_link_image.url,
  });
}

export function validateButtonStyleResponse(response: any) {
  return buttonStyleResponseSchema.parse(response);
}
