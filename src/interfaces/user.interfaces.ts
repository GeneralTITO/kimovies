import { DeepPartial } from 'typeorm';
import { z } from "zod";
import {
  createUserSchema,
  createUserSchemaWithAdmin,
  manyUsersSchema,
  returnUserSchema,
  userSchema,
  userWithoutPassword,
} from "../schemas/user.schemas";

type iUser = z.infer<typeof userSchema>;
type iCreateUser = z.infer<typeof createUserSchema>;
type iReturnUser = z.infer<typeof returnUserSchema>;
type IManyUsers = z.infer<typeof manyUsersSchema>;
type IUserWithoutPassword = z.infer<typeof userWithoutPassword>;
type IUserUpdate = DeepPartial<iUser>
type iCreateUserWAdmin=z.infer<typeof createUserSchemaWithAdmin>

export {
  iUser,
  iCreateUser,
  iReturnUser,
  IManyUsers,
  IUserWithoutPassword,
  IUserUpdate,
};
