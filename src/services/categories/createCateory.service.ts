import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { Repository } from "typeorm";

import { AppError } from "../../errors";
import {
  ICategory,
  ICreateCategory,
} from "../../interfaces/categories.interfaces";
import { categoriesSchema } from "../../schemas/categories.schema";

const createCategoryService = async (
  bodyData: ICreateCategory
): Promise<ICategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryExists = await categoryRepository.findOneBy({
    name: bodyData.name,
  });

  if (categoryExists) {
    throw new AppError("Category already exists", 409);
  }

  const category: Category = categoryRepository.create(bodyData);

  await categoryRepository.save(category);

  const newCategory = categoriesSchema.parse(category);

  return newCategory;
};

export default createCategoryService;
