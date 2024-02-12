import { Router } from "express";
import { loginController } from "../controllers/session.controller";

export const sessionRouter: Router = Router();

sessionRouter.post("/", loginController);
