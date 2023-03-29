import { z } from "zod";

const categoriesSchema = z.object({
  id: z.number().int(),
  name: z.string().max(45),
});

const createCategory = categoriesSchema.omit({ id: true });
const receiveIdCategorySchema = z.number().int().positive();
const createCategoryInRealState = categoriesSchema.omit({ name: true });
const manyCategories = categoriesSchema.array();

export {
  categoriesSchema,
  createCategory,
  manyCategories,
  createCategoryInRealState,
  receiveIdCategorySchema
};
