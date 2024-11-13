import { z } from "zod";

const footerSectionSchema = z.object({
  title: z.string().optional(),
  links: z.array(
    z.object({
      displayText: z.string(),
      href: z.string().optional(),
    })
  ),
});
export const footerSchema = z.object({
  sections: z.array(footerSectionSchema),
  iconLinks: z.array(
    z.object({
      imageUrl: z.string(),
      name: z.string().optional(),
      href: z.string().optional(),
    })
  ),
});
export type Footer = z.infer<typeof footerSchema>;
