import { z } from "zod";

export const contactSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().email().max(150),
  phoneNumber: z.string().max(18),
  registeredAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const createContactSchema = contactSchema.pick({
  name: true,
  email: true,
  phoneNumber: true,
});

export const updateContactSchema = contactSchema.partial();

export const contactReturnListSchema = contactSchema.array();
