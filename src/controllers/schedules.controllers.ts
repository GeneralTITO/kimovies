import { Request, Response } from "express";
import createSchedulesService from "../services/schedules/createSchedules.service";
import listSchedulesPerRealEstateService from "../services/schedules/listAllSchedulesPerRealEstate.service";

const createScheduleController = async (req: Request, res: Response) => {
  const scheduleData = req.body;
  const idUser = req.user.id;
  const idRealEstate = req.body.realEstateId;

  const newScheduleData = await createSchedulesService(
    scheduleData,
    idUser,
    idRealEstate
  );

  return res.status(201).json(newScheduleData);
};

const listSchedulesPerRealEStatesController = async (
  req: Request,
  res: Response
) => {

  const idRealEstate: number = Number(req.params.id);
  const manySchedulesPerRealEstate = await listSchedulesPerRealEstateService(
    idRealEstate
  );

  return res.status(200).json(manySchedulesPerRealEstate);
};

export { createScheduleController, listSchedulesPerRealEStatesController };
