import createRealStateService from "../services/realState/createRealState.service";
import { Request, Response } from "express";
import listAllRealStateService from "../services/realState/readAllRealState.service";

const createRealStateController = async (req: Request, res: Response) => {
  const realStateData = req.body;

  const newRealState = await createRealStateService(realStateData);

  return res.status(201).json(newRealState);
};

const listRealStateController = async (req: Request, res: Response) => {
  const manyRealStates = await listAllRealStateService();

  return res.status(200).json(manyRealStates);
};

export { listRealStateController, createRealStateController };
