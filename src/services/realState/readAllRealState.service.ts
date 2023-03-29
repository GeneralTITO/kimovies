import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, RealEstate } from "../../entities";

const listAllRealStateService = async (): Promise<any> => {
  const realStateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);


  const queryBuilder = realStateRepository
  .createQueryBuilder("realEstate")
  .leftJoinAndSelect("realEstate.address", "address")
  .select(["realEstate", "address",]);

const result = await queryBuilder.getMany();



  return result;
};

export default listAllRealStateService;
