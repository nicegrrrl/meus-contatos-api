import { Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  readAllContactsService,
  readContactByIdService,
  readContactsClientService,
  updateContactService,
} from "../services/contacts.service";
import { Contact } from "../entities/Contact.entity";
import {
  ContactUpdate,
  ContactsReturnList,
} from "../interfaces/contacts.interface";

export const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { sub } = res.locals.decoded;

  await createContactService(req.body, sub);

  return res.status(201).json({ message: "Contact created" });
};

export const readAllContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contacts = await readAllContactsService();

  return res.status(200).json(contacts);
};

export const readContactsClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { clientId } = req.params;

  const contacts: ContactsReturnList = await readContactsClientService(
    Number(clientId)
  );

  return res.status(200).json(contacts);
};

export const readContactByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { contactId } = req.params;

  const contact: Contact = await readContactByIdService(Number(contactId));

  return res.status(200).json(contact);
};

export const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactId = Number(req.params.contactId);

  const updatedContact: ContactUpdate = await updateContactService(
    contactId,
    req.body
  );

  return res.status(200).json(updatedContact);
};

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactId = Number(req.params.contactId);

  await deleteContactService(contactId);

  return res.status(204).send();
};
