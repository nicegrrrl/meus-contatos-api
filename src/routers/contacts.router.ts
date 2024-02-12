import { Router } from "express";
import {
  validateBody,
  verifyAdmin,
  verifyPermissions,
  verifyToken,
} from "../middlewares/globals.middleware";
import {
  createContactController,
  deleteContactController,
  readAllContactsController,
  readContactByIdController,
  readContactsClientController,
  updateContactController,
} from "../controllers/contacts.controller";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contacts.schema";
import { verifyClientContactExists } from "../middlewares/contacts.middleware";

export const contactRouter: Router = Router();

contactRouter.post(
  "/",
  verifyToken,
  validateBody(createContactSchema),
  createContactController
);

contactRouter.get("/", verifyToken, verifyAdmin, readAllContactsController);

contactRouter.get(
  "/client/:clientId",
  verifyToken,
  verifyPermissions,
  readContactsClientController
);

contactRouter.use("/:contactId", verifyToken, verifyClientContactExists);

contactRouter.get("/:contactId", readContactByIdController);

contactRouter.patch(
  "/:contactId",
  validateBody(updateContactSchema),
  updateContactController
);

contactRouter.delete("/:contactId", deleteContactController);
