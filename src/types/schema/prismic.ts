import { z } from "zod";

const buttonStyleTypes = ["Filled", "Outlined"] as const;
export const buttonStyleResponseSchema = z.object({
  id: z.string(),
  data: z.object({
    primary_color: z.object({
      id: z.string().optional(),
      data: z
        .object({
          color: z.string(),
        })
        .optional(),
    }),
    secondary_color: z.object({
      id: z.string().optional(),
      data: z
        .object({
          color: z.string(),
        })
        .optional(),
    }),
    hover_primary_color: z.object({
      id: z.string().optional(),
      data: z
        .object({
          color: z.string(),
        })
        .optional(),
    }),
    hover_secondary_color: z.object({
      id: z.string().optional(),
      data: z
        .object({
          color: z.string(),
        })
        .optional(),
    }),
    disabled_primary_color: z.object({
      id: z.string().optional(),
      data: z
        .object({
          color: z.string(),
        })
        .optional(),
    }),
    disabled_secondary_color: z.object({
      id: z.string().optional(),
      data: z
        .object({
          color: z.string(),
        })
        .optional(),
    }),
    type: z.enum(buttonStyleTypes),
    full_width: z.boolean(),
  }),
});
