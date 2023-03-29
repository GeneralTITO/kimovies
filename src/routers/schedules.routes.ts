import { Router } from "express";
import {
  createScheduleController,
  listSchedulesPerRealEStatesController,
} from "../controllers/schedules.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureisAdmin from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import { createSchema } from "../schemas/schedules.schema";

const scheduleRoutes: Router = Router();

scheduleRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureDataIsValidMiddleware(createSchema),
  createScheduleController
);
scheduleRoutes.get(
  "/realEstate/:id",
  ensureTokenIsValidMiddleware,
  ensureisAdmin,
  listSchedulesPerRealEStatesController
);

export default scheduleRoutes;
