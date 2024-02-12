import { DeepPartial, Repository } from "typeorm";
import { Contact } from "../entities/Contact.entity";
import { z } from "zod";
import {
  contactReturnListSchema,
  contactSchema,
  createContactSchema,
} from "../schemas/contacts.schema";

export type ContactRepo = Repository<Contact>;

export type ContactCreate = z.infer<typeof createContactSchema>;

export type ContactReturn = z.infer<typeof contactSchema>;

export type ContactUpdate = DeepPartial<ContactCreate>;

export type ContactReadReturn = ContactReturn[];

export type ContactsReturnList = z.infer<typeof contactReturnListSchema>;
