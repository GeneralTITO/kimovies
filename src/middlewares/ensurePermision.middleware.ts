import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const ensurePermision = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;

  const authenticatedUser = req.user;

  if (authenticatedUser.admin !== true && Number(id) !== authenticatedUser.id) {
    throw new AppError("Insufficient permission", 403);
  }
  return next();
};
export default ensurePermision;
