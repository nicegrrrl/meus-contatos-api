import { Client } from "../entities/Client.entity";
import { AppErrors } from "../errors/AppErrors.error";
import {
  ClientCreate,
  ClientLoggedReturn,
  ClientReadReturn,
  ClientReturn,
  ClientUpdate,
} from "../interfaces/clients.interface";
import { clientRepo } from "../repositories";
import {
  clientReturnSchema,
  clientsReturnListSchema,
  loggedClientReturnSchema,
} from "../schemas/clients.schema";

export const createClientService = async (
  data: ClientCreate
): Promise<ClientReturn> => {
  const client: Client = clientRepo.create(data);

  await clientRepo.save(client);

  return clientReturnSchema.parse(client);
};

export const readClientsService = async (): Promise<ClientReadReturn> => {
  const clients: Client[] = await clientRepo.find();

  return clientsReturnListSchema.parse(clients);
};

export const readClientByIdService = async (
  clientId: number
): Promise<ClientReturn> => {
  const client: Client | null = await clientRepo.findOneBy({ id: clientId });

  if (!client) {
    throw new AppErrors("Contact not found", 404);
  }

  return clientReturnSchema.parse(client);
};

export const readLoggedClientService = async (
  clientId: number
): Promise<ClientLoggedReturn> => {
  const client: Client | null = await clientRepo.findOne({
    where: { id: clientId },
    relations: {
      contacts: true,
    },
  });

  if (!client) {
    throw new AppErrors("Contact not found", 404);
  }

  return loggedClientReturnSchema.parse(client);
};

export const updateClientService = async (
  data: ClientUpdate,
  client: Client
): Promise<ClientReturn> => {
  const clientUpdate: Client = await clientRepo.save({ ...client, ...data });

  return clientReturnSchema.parse(clientUpdate);
};

export const deleteClientService = async (client: Client): Promise<void> => {
  await clientRepo.softRemove(client);
};
