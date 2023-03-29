import { z } from "zod";
import loginSchema from "../schemas/login.schema";

type ILogin = z.infer<typeof loginSchema>;

export default ILogin;
