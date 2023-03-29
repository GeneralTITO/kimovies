import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

const ensureisAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default ensureisAdmin;
