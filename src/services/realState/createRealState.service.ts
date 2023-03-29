import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { Repository } from "typeorm";
import { iCreateRealState } from "../../interfaces/realState.interfaces";
import { AppError } from "../../errors";


const createRealStateService = async (
  userData: iCreateRealState
): Promise<any> => {
  const realStateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const { address, categoryId, ...realState } = userData;

  const categoryExists = await categoryRepository.findOneBy({
    id: categoryId!
  });
  if (!categoryExists) {
    throw new AppError("category not exists", 404);
  }
  const addressExists = await addressRepository.findOneBy({
    city: address.city,
    state: address.state,
    street: address.street,
    zipCode: address.zipCode,
  });

  if (addressExists) {
    throw new AppError("Address already exists", 409);
  }

  const addressData: Address = addressRepository.create(address);

  const newAddress = await addressRepository.save(addressData);

  if (!categoryId) {
    const realStateData: RealEstate = realStateRepository.create({
      ...realState,
      address: newAddress,
    });
    await realStateRepository.save(realStateData);

    return realStateData;
  } else {
    const realStateData: RealEstate = realStateRepository.create({
      ...realState,
      address: newAddress,
      category: categoryExists,
    });
    await realStateRepository.save(realStateData);

    return realStateData;
  }
};

export default createRealStateService;
