import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.js";
import { createCredential, showCredentials } from "../controllers/credentialsController.js";

const credentialsRouter = Router();

credentialsRouter.post("/credentials", authValidation, createCredential);
credentialsRouter.get("/credentials", authValidation, showCredentials);
credentialsRouter.delete("/credentials/:id", authValidation);

export default credentialsRouter;