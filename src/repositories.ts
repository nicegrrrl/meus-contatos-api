import { AppDataSource } from "./data-source";
import { Client } from "./entities/Client.entity";
import { Contact } from "./entities/Contact.entity";
import { ClientRepo } from "./interfaces/clients.interface";
import { ContactRepo } from "./interfaces/contacts.interface";

export const clientRepo: ClientRepo = AppDataSource.getRepository(Client);

export const contactRepo: ContactRepo = AppDataSource.getRepository(Contact);
