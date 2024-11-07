import { megaMenuSchema } from "@/types/schema/schema";

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
