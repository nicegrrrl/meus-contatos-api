import { z } from "zod";
import { contactSchema } from "./contacts.schema";

export const clientSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().email().max(150),
  password: z.string().max(120),
  phoneNumber: z.string().max(18),
  admin: z.boolean().default(false),
  registeredAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const createClientSchema = clientSchema.pick({
  name: true,
  email: true,
  password: true,
  phoneNumber: true,
  admin: true,
});

export const clientReturnSchema = clientSchema.omit({ password: true });

export const loggedClientReturnSchema = clientReturnSchema.extend({
  contacts: contactSchema.array(),
});

export const clientsReturnListSchema = clientReturnSchema.array();

export const clientWithoutAdmin = createClientSchema.omit({ admin: true });

export const updateClientSchema = clientWithoutAdmin.partial();

export const clientLoginSchema = clientSchema.pick({
  email: true,
  password: true,
});
