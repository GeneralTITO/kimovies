import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

const listSchedulesPerRealEstateService = async (
  idRealEstate: number
): Promise<any> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateExists = await realEstateRepository.findOneBy({
    id: idRealEstate,
  });

  if (!realEstateExists) {
    throw new AppError("RealEstate not found", 404);
  }

  const realEstateSchedules = await realEstateRepository
    .createQueryBuilder("realEstate")
    .leftJoinAndSelect("realEstate.schedules", "schedules")
    .leftJoinAndSelect("realEstate.address", "address")
    .leftJoinAndSelect("realEstate.category", "category")
    .leftJoinAndSelect("schedules.user", "user")
    .getOne();

  return realEstateSchedules;
};

export default listSchedulesPerRealEstateService;
