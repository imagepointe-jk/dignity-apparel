import { z } from "zod";

const megaMenuSectionSchema = z.object({
  title: z.string().optional(),
  links: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    })
  ),
});
const megaMenuFeaturedSchema = z.object({
  caption: z.string(),
  imageUrl: z.string(),
  imageAlt: z.string(),
  href: z.string(),
});
const megaMenuItemSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  sections: z.array(megaMenuSectionSchema),
  featured: z.array(megaMenuFeaturedSchema),
});
export const megaMenuSchema = z.object({
  items: z.array(megaMenuItemSchema),
});

export type MegaMenu = z.infer<typeof megaMenuSchema>;
