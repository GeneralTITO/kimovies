import { z } from "zod";
import {
  categoriesSchema,
  createCategory,
  manyCategories,
} from "../schemas/categories.schema";

type ICategory = z.infer<typeof categoriesSchema>;
type ICreateCategory = z.infer<typeof createCategory>;
type IManyCategories = z.infer<typeof manyCategories>;

export { ICategory, ICreateCategory, IManyCategories };
