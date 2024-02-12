import "dotenv/config";
import { compare } from "bcryptjs";
import { Client } from "../entities/Client.entity";
import { AppErrors } from "../errors/AppErrors.error";
import { ClientLogin, LoginReturn } from "../interfaces/clients.interface";
import { clientRepo } from "../repositories";
import { sign } from "jsonwebtoken";

export const loginService = async (data: ClientLogin): Promise<LoginReturn> => {
  const { email } = data;

  const client: Client | null = await clientRepo.findOneBy({ email });

  if (!client) {
    throw new AppErrors("Invalid email or password", 401);
  }

  const comparePass = await compare(data.password, client.password);

  if (!comparePass) {
    throw new AppErrors("Invalid email or password", 401);
  }

  const token: string = sign(
    { email: client.email, admin: client.admin },
    process.env.SECRET_KEY!,
    { subject: client.id.toString(), expiresIn: process.env.EXPIRES_IN }
  );

  return { token };
};
