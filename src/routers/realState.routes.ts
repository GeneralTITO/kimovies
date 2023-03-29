import { Router } from "express";
import { createRealStateController, listRealStateController } from "../controllers/realState.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureisAdmin from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { createStateSchema } from "../schemas/realState.schema";

const realStateRoutes: Router = Router();

realStateRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureisAdmin,
  ensureDataIsValidMiddleware(createStateSchema),
  createRealStateController
);
realStateRoutes.get("",listRealStateController);
export default realStateRoutes;
