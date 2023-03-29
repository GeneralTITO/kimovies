import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { iCreateUser, iReturnUser } from "../../interfaces/user.interfaces";
import { returnUserSchema } from "../../schemas/user.schemas";
import { AppError } from "../../errors";

const createUserService = async (
  userData: iCreateUser
): Promise<iReturnUser> => {

  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userExists = await userRepository.findOneBy({
    email: userData.email,
  });

  if (userExists) {
    throw new AppError("Email already exists", 409);
  }

  const user: User = userRepository.create(userData);

  await userRepository.save(user);

  const newUser = returnUserSchema.parse(user);

  return newUser;
};

export default createUserService;
