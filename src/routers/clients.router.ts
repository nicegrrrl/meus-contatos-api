import { Router } from "express";
import {
  validateBody,
  verifyAdmin,
  verifyPermissions,
  verifyToken,
} from "../middlewares/globals.middleware";
import {
  createClientSchema,
  updateClientSchema,
} from "../schemas/clients.schema";
import {
  createClientController,
  deleteClientController,
  readClientByIdController,
  readClientsController,
  readLoggedClientController,
  updateClientController,
} from "../controllers/clients.controller";
import {
  verifyClientExists,
  verifyUniqueEmail,
} from "../middlewares/clients.middleware";

export const clientRouter: Router = Router();

clientRouter.post(
  "/",
  validateBody(createClientSchema),
  verifyUniqueEmail,
  createClientController
);

clientRouter.get("/", verifyToken, verifyAdmin, readClientsController);

clientRouter.get("/logged", verifyToken, readLoggedClientController);

clientRouter.use(
  "/:clientId",
  verifyToken,
  verifyClientExists,
  verifyPermissions
);

clientRouter.get("/:clientId", readClientByIdController);

clientRouter.patch(
  "/:clientId",
  validateBody(updateClientSchema),
  updateClientController
);

clientRouter.delete("/:clientId", deleteClientController);
