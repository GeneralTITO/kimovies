import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import loginSchema from "../schemas/login.schema";

const loginRoutes: Router = Router();

loginRoutes.post("", ensureDataIsValidMiddleware(loginSchema), createLoginController);

export default loginRoutes;
