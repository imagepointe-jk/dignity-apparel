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
  imageUrl: z.string(),
  variations: z.array(productVariationSchema),
});
