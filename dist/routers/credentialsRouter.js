import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.js";
import { credentialValidation } from "../middlewares/schemasValidation.js";
import { createCredential, showCredentials, deleteCredential } from "../controllers/credentialsController.js";
var credentialsRouter = Router();
credentialsRouter.post("/credentials", authValidation, credentialValidation, createCredential);
credentialsRouter.get("/credentials", authValidation, showCredentials);
credentialsRouter["delete"]("/credentials/:id", authValidation, deleteCredential);
export default credentialsRouter;
