import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";


const listRealStatePerCategory = async (idParams: number): Promise<any> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const categoryExists = await categoryRepository.findOneBy({ id: idParams });
  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  const category = await categoryRepository.findOne({
    where: {
      id: idParams,
    },
    relations: {
        realEstate: true,
    },
  });

  return category;
};

export default listRealStatePerCategory;
