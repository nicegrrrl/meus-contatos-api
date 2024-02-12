import { Client } from "../entities/Client.entity";
import { Contact } from "../entities/Contact.entity";
import { AppErrors } from "../errors/AppErrors.error";
import {
  ContactCreate,
  ContactReadReturn,
  ContactReturn,
} from "../interfaces/contacts.interface";
import { clientRepo, contactRepo } from "../repositories";
import {
  contactReturnListSchema,
  contactSchema,
} from "../schemas/contacts.schema";

export const createContactService = async (
  data: ContactCreate,
  clientId: number
): Promise<void> => {
  const client: Client | null = await clientRepo.findOneBy({ id: clientId });

  await contactRepo.save({ ...data, client: client! });
};

export const readAllContactsService = async (): Promise<ContactReadReturn> => {
  const contacts: Contact[] = await contactRepo.find();

  return contactReturnListSchema.parse(contacts);
};

export const readContactsClientService = async (clientId: number) => {
  const client: Client | null = await clientRepo.findOne({
    where: {
      id: clientId,
    },
    relations: {
      contacts: {
        client: false,
      },
    },
  });

  if (!client) {
    throw new AppErrors("Client not found", 404);
  }

  return client.contacts;
};

export const readContactByIdService = async (contactId: number) => {
  const contact: Contact | null = await contactRepo.findOneBy({
    id: contactId,
  });

  if (!contact) {
    throw new AppErrors("Contact not found", 404);
  }

  return contact;
};

export const updateContactService = async (
  contactId: number,
  data: ContactCreate
): Promise<ContactReturn> => {
  const contact: Contact = await readContactByIdService(Number(contactId));

  const contactUpdate: Contact = await contactRepo.save({
    ...contact,
    ...data,
  });

  return contactSchema.parse(contactUpdate);
};

export const deleteContactService = async (
  contactId: number
): Promise<void> => {
  const contact: Contact = await readContactByIdService(Number(contactId));

  await contactRepo.softRemove(contact);
};
