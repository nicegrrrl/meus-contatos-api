import { z } from "zod";
import {
  clientLoginSchema,
  clientReturnSchema,
  createClientSchema,
  loggedClientReturnSchema,
} from "../schemas/clients.schema";
import { DeepPartial, Repository } from "typeorm";
import { Client } from "../entities/Client.entity";

export type ClientCreate = z.infer<typeof createClientSchema>;

export type ClientReturn = z.infer<typeof clientReturnSchema>;

export type ClientRepo = Repository<Client>;

export type ClientLogin = z.infer<typeof clientLoginSchema>;

export type ClientLoggedReturn = z.infer<typeof loggedClientReturnSchema>;

export type LoginReturn = { token: string };

export type ClientReadReturn = ClientReturn[];

export type ClientBodyUpdate = Omit<ClientCreate, "admin">;

export type ClientUpdate = DeepPartial<ClientBodyUpdate>;
