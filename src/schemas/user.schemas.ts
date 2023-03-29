import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().optional().default(false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const createUserSchema = userSchema.omit({
  id: true,
  deletedAt: true,
  updatedAt: true,
  createdAt: true,
  admin: true,
});
const createUserSchemaWithAdmin = userSchema.omit({
  id: true,
  deletedAt: true,
  updatedAt: true,
  createdAt: true,
});
const updateUserSchema = createUserSchema.deepPartial();
const userWithoutPassword = userSchema.omit({ password: true });
const returnUserSchema = userSchema.omit({ password: true });
const manyUsersSchema = userWithoutPassword.array();

export {
  userSchema,
  createUserSchema,
  returnUserSchema,
  manyUsersSchema,
  userWithoutPassword,
  updateUserSchema,
  createUserSchemaWithAdmin,
};
