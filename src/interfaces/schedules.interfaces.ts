import { z } from "zod";
import { createSchema, schedule } from "../schemas/schedules.schema";

type ISchedule = z.infer<typeof schedule>;
type ICreateSchedule = z.infer<typeof createSchema>;

export { ISchedule, ICreateSchedule };
