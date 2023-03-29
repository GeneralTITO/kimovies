import { z } from "zod";
import { addressSchema, createAddressSchema } from "../schemas/address.schema";

type IAddress = z.infer<typeof addressSchema>;

type iCreateAddress = z.infer<typeof createAddressSchema>;

export { IAddress, iCreateAddress };
