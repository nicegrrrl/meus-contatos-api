import { NextFunction, Request, Response } from "express";
import { AppErrors } from "../errors/AppErrors.error";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const handleErrors = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppErrors) {
    return res.status(error.status).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ message: error.flatten().fieldErrors });
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: error.message });
  }

  console.log(error);

  return res.status(500).json({ message: "Internal Server Error" });
};
