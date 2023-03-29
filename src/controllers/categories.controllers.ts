import { Request, Response } from "express";
import { ICreateCategory } from "../interfaces/categories.interfaces";
import createCategoryService from "../services/categories/createCateory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listRealStatePerCategory from "../services/categories/listRealStatesPerCategory.service";

const createCategoryController = async (req: Request, res: Response) => {
  const categoryData: ICreateCategory = req.body;

  const newCategory = await createCategoryService(categoryData);

  return res.status(201).json(newCategory);
};

const listAllCategories = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();

  return res.status(200).json(categories);
};

const listRealStatesPerCategory = async (req: Request, res: Response) => {
  const categoryId = Number(req.params.id);

  const realStatesPerCategories = await listRealStatePerCategory(categoryId);
  return res.status(200).json(realStatesPerCategories);
};

export {
  createCategoryController,
  listAllCategories,
  listRealStatesPerCategory,
};
