import { z } from "zod";
import {
  createStateSchema,
  realStateSchema,
} from "../schemas/realState.schema";

type IRealState = z.infer<typeof realStateSchema>;
type iCreateRealState = z.infer<typeof createStateSchema>;

export { iCreateRealState, IRealState };
