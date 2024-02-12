import { Router } from "express";
import { clientRouter } from "./clients.router";
import { sessionRouter } from "./session.router";
import { contactRouter } from "./contacts.router";

export const routes: Router = Router();

routes.use("/clients", clientRouter);
routes.use("/login", sessionRouter);
routes.use("/contacts", contactRouter);
