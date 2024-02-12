import { NextFunction, Request, Response } from "express";
import { Client } from "../entities/Client.entity";
import { clientRepo } from "../repositories";
import { AppErrors } from "../errors/AppErrors.error";

export const verifyUniqueEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const client: Client | null = await clientRepo.findOneBy({ email });

  if (client) {
    throw new AppErrors("Email already exists", 409);
  }

  return next();
};

export const verifyClientExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { clientId } = req.params;
  const client: Client | null = await clientRepo.findOneBy({
    id: Number(clientId),
  });

  if (!client) {
    throw new AppErrors("Client not found", 404);
  }

  res.locals = { ...res.locals, client };

  return next();
};
