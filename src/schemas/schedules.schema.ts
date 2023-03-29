import { z } from "zod";

const schedule = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  userId: z.string(),
  realEstateId: z.number(),
});

const createSchema = schedule.omit({ id: true, userId: true });

export { schedule, createSchema };
