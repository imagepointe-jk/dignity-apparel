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

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  subcategories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
  ),
});

export const pageInfoSchema = z.object({
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  startCursor: z.string().nullable(),
  endCursor: z.string().nullable(),
});

export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;
export type PageInfo = z.infer<typeof pageInfoSchema>;
