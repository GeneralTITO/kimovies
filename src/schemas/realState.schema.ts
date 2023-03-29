import { z } from "zod";
import { createAddressSchema } from "./address.schema";
import { receiveIdCategorySchema } from "./categories.schema";

const realStateSchema = z.object({
  id: z.number(),
  sold: z.boolean(),
  size: z.number().int().positive(),
  value: z.number().positive().or(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  categoryId: receiveIdCategorySchema.optional(),
  address: createAddressSchema,
});

const createStateSchema = realStateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  sold: true,
});

export { realStateSchema, createStateSchema };
