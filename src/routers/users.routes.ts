import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureisAdmin from "../middlewares/ensureIsAdmin.middleware";
import ensurePermision from "../middlewares/ensurePermision.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserExists from "../middlewares/ensureUserExists.middleware";
import {
  createUserSchemaWithAdmin,
  updateUserSchema,
} from "../schemas/user.schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchemaWithAdmin),
  createUserController
);
usersRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureisAdmin,
  listUsersController
);
usersRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(updateUserSchema),
  ensureUserExists,
  ensurePermision,
  updateUserController
);
usersRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExists,
  ensurePermision,
  deleteUserController
);

export default usersRoutes;
