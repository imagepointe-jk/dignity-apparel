import { z } from "zod";

const productVariationSchema = z.object({
  id: z.number(),
  name: z.string(),
  attributes: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
  imageUrl: z.string(),
});

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  slug: z.string(),
  imageUrl: z.string(),
  descriptionSanitized: z.string(),
  sizeUpcharges: z.object({
    upcharge2x: z.number().optional().nullable(),
    upcharge3x: z.number().optional().nullable(),
    upcharge4x: z.number().optional().nullable(),
  }),
  variations: z.array(productVariationSchema),
});

export type Product = z.infer<typeof productSchema>;
