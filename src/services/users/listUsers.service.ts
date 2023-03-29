import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { IManyUsers } from "../../interfaces/user.interfaces";

import { manyUsersSchema } from "../../schemas/user.schemas";

const listUsersService = async (): Promise<IManyUsers> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUsers = await userRepository.find();

  const users = manyUsersSchema.parse(findUsers);

  return users;
};

export { listUsersService };
