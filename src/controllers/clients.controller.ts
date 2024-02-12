import { Request, Response } from "express";
import { ClientReturn } from "../interfaces/clients.interface";
import {
  createClientService,
  deleteClientService,
  readClientByIdService,
  readClientsService,
  readLoggedClientService,
  updateClientService,
} from "../services/clients.service";

export const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client: ClientReturn = await createClientService(req.body);

  return res.status(201).json(client);
};

export const readClientsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clients: ClientReturn[] = await readClientsService();

  return res.status(200).json(clients);
};

export const readClientByIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId = Number(req.params.clientId);

  const client: ClientReturn = await readClientByIdService(clientId);

  return res.status(200).json(client);
};

export const readLoggedClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const clientId = res.locals.decoded.sub;

  const client: ClientReturn = await readLoggedClientService(clientId);

  return res.status(200).json(client);
};

export const updateClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { client } = res.locals;
  const newClient: ClientReturn = await updateClientService(req.body, client);

  return res.status(200).json(newClient);
};

export const deleteClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { client } = res.locals;

  await deleteClientService(client);

  return res.status(204).send();
};
