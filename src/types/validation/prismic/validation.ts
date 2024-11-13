import { footerSchema } from "@/types/schema/footer";
import { megaMenuSchema } from "@/types/schema/navbar";

export function validateMegaMenuResponse(response: any) {
  return megaMenuSchema.parse({
    items: response.data.navigation.map((item: any) => {
      return {
        label: item.mega_menu_item.data.label,
        href: item.mega_menu_item.data.url,
        sections: item.mega_menu_item.data.sections.map((item: any) => {
          return {
            title: item.section.data.title,
            links: item.section.data.links.map((item: any) => ({
              label: item.link.text,
              href: item.link.url,
            })),
          };
        }),
        featured: item.mega_menu_item.data.featured_images.map((item: any) => ({
          caption: item.featured_image.data.caption,
          imageUrl: item.featured_image.data.image.url,
          imageAlt: item.featured_image.data.image.alt || "image",
          href: item.featured_image.data.link.url,
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
        imageUrl: item.icon.url,
        href: item.link.url,
        name: item.link_name,
      };
    }),
  });
}
