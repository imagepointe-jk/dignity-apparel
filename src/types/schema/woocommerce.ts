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
  stockQuantity: z.number().nullable(),
});

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  slug: z.string(),
  imageUrl: z.string(),
  descriptionSanitized: z.string(),
  shortDescriptionSanitized: z.string(),
  sizeUpcharges: z.object({
    upcharge2x: z.number().optional().nullable(),
    upcharge3x: z.number().optional().nullable(),
    upcharge4x: z.number().optional().nullable(),
  }),
  additionalProductInformation: z.object({
    careInformationSanitized: z.string().optional().nullable(),
    materialDescription: z.string().optional().nullable(),
  }),
  categories: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      slug: z.string(),
    })
  ),
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
  globalAttributes: z.array(
    z.object({
      name: z.string(),
      terms: z.array(z.object({ slug: z.string() })),
    })
  ),
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

export const attributeSchema = z.object({
  attribute: z.object({
    attribute_id: z.string(),
    attribute_name: z.string(),
    attribute_label: z.string(),
  }),
  terms: z.array(
    z.object({
      term_id: z.number(),
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
export type ProductVariation = z.infer<typeof productVariationSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Attribute = z.infer<typeof attributeSchema>;
export type PageInfo = z.infer<typeof pageInfoSchema>;
export type ProductBrowseURLParams = {
  first: number | null;
  last: number | null;
  before: string | null;
  after: string | null;
  search: string | null;
  category: string | null;
  fit: "mens" | "womens" | "unisex";
  features: string[];
  ["fabric-type"]: string[];
  ["fabric-weight"]: string[];
  availability: "made-to-order" | "in-stock" | null;
};
export type ProductQueryParams = {
  search: string | null;
  category: string | null;
  availability: string | null;
  fabricType: string[];
  fabricWeight: string[];
  features: string[];
  fit: string | null;
  before: string | null;
  after: string | null;
  first: number | null;
  last: number | null;
};
