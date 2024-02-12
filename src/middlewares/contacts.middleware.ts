import { NextFunction, Request, Response } from "express";
import { contactRepo } from "../repositories";
import { AppErrors } from "../errors/AppErrors.error";
import { Contact } from "../entities/Contact.entity";

export const verifyClientContactExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const sub = Number(res.locals.decoded.sub);
  const { admin } = res.locals.decoded;
  const contactId = Number(req.params.contactId);

  const contact: Contact | null = await contactRepo.findOne({
    where: {
      client: {
        id: sub,
      },
      id: contactId,
    },
  });

  if (admin) {
    return next();
  }

  if (!contact) {
    throw new AppErrors("Insufficient permission.", 403);
  }

  return next();
};
