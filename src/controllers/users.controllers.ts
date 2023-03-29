import { Request, Response } from "express";
import { iCreateUser } from "../interfaces/user.interfaces";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import { listUsersService } from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: iCreateUser = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listUsersController = async (req: Request, res: Response) => {
  const manyUsers = await listUsersService();

  return res.status(200).json(manyUsers);
};

const updateUserController = async (req: Request, res: Response) => {
  const userData = req.body;
  const idUser = parseInt(req.params.id);

  const updatedUser = await updateUserService(userData, idUser);

  return res.json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  await deleteUserService(id);

  return res.status(204).json();
};

export {
  createUserController,
  listUsersController,
  updateUserController,
  deleteUserController,
};
