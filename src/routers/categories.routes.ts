import { Router } from "express";
import { createCategoryController, listAllCategories, listRealStatesPerCategory } from "../controllers/categories.controllers";
import ensureisAdmin from "../middlewares/ensureIsAdmin.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

const categoryRoutes: Router = Router();

categoryRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureisAdmin,
  createCategoryController
);
categoryRoutes.get("",listAllCategories)

categoryRoutes.get('/:id/realEstate',listRealStatesPerCategory)

export default categoryRoutes;
