import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import {
  iCreateUser,
  IUserWithoutPassword,
} from "../../interfaces/user.interfaces";
import { userWithoutPassword } from "../../schemas/user.schemas";

const updateUserService = async (
  newUserData: iCreateUser,
  idUser: number
): Promise<IUserWithoutPassword> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData = await userRepository.findOneBy({
    id: idUser,
  });

  const user = userRepository.create({
    ...oldUserData,
    ...newUserData,
  });

  await userRepository.save(user);

  const updatedUser = userWithoutPassword.parse(user);

  return updatedUser;
};

export default updateUserService;
