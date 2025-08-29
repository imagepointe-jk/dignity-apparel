import { z } from "zod";

const productAttributeSchema = z.object({
  name: z.string(),
  value: z.string(),
});

const productVariationSchema = z.object({
  id: z.number(),
  name: z.string(),
  attributes: z.array(productAttributeSchema),
  imageUrl: z.string(),
  stockQuantity: z.number().nullable(),
  price: z.string(),
});

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  slug: z.string(),
  link: z.string(),
  imageUrl: z.string(),
  menuOrder: z.number(),
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
  additionalProductSettings: z.object({
    linkTextOverride: z.string().optional().nullable(),
    linkURLOverride: z.string().optional().nullable(),
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

const billingOrShippingSchema = z.object({
  company: z.string().nullable(),
  address1: z.string().nullable(),
  address2: z.string().nullable(),
  city: z.string().nullable(),
  postcode: z.string().nullable(),
  country: z.string().nullable(),
  state: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
});

export const customerSchema = z.object({
  id: z.string(),
  databaseId: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  billing: billingOrShippingSchema,
  shipping: billingOrShippingSchema,
});

export const cartItemSchema = z.object({
  key: z.string(),
  product: z.object({
    id: z.string(),
    databaseId: z.number(),
    name: z.string(),
    slug: z.string(),
  }),
  quantity: z.number(),
  subtotal: z.string(),
  variation: z.object({
    id: z.string(),
    databaseId: z.number(),
    stockQuantity: z.number(),
    price: z.string(),
    attributes: z.array(productAttributeSchema),
    image: z
      .object({
        guid: z.string(),
      })
      .optional()
      .nullable(),
    lowStockAmount: z.number(),
    weight: z.string(),
  }),
});

export const cartSchema = z.object({
  items: z.array(cartItemSchema),
  subtotal: z.string(),
  subtotalTax: z.string(),
});

const cartQuantityUpdateItemSchema = z.object({
  key: z.string(),
  quantity: z.number(),
});

export const cartQuantityUpdateSchema = z.object({
  items: z.array(cartQuantityUpdateItemSchema),
});

const pastOrderLineItemSchema = z.object({
  id: z.string(),
  databaseId: z.number(),
  product: z.object({
    id: z.string(),
    databaseId: z.number(),
    name: z.string(),
    slug: z.string(),
    sku: z.string(),
  }),
  variation: z.object({
    id: z.string(),
    databaseId: z.number(),
    name: z.string(),
  }),
  quantity: z.number(),
  subtotal: z.string(),
});

export const pastOrderSchema = z.object({
  id: z.string(),
  databaseId: z.number(),
  customer: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  lineItems: z.array(pastOrderLineItemSchema),
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
  pageNumber: number | null;
  pageSize: number | null;
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
export type ProductQueryAdditionalParams = {
  pageNumber: number | null;
  pageSize: number | null;
};
export type Customer = z.infer<typeof customerSchema>;
export type Cart = z.infer<typeof cartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type CartQuantityUpdate = z.infer<typeof cartQuantityUpdateSchema>;
export type PastOrder = z.infer<typeof pastOrderSchema>;
