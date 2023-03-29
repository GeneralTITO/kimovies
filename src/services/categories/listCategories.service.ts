import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { IManyCategories } from "../../interfaces/categories.interfaces";
import { manyCategories } from "../../schemas/categories.schema";

const listCategoriesService = async (): Promise<IManyCategories> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const findCategories = await categoryRepository.find();

  const categories = manyCategories.parse(findCategories);

  return categories;
};

export default listCategoriesService;
