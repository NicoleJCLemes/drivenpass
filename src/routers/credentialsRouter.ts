import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.js";
import { createCredential } from "../controllers/credentialsController.js";

const credentialsRouter = Router();

credentialsRouter.post("/credentials", authValidation, createCredential);
credentialsRouter.get("/credentials", authValidation);
credentialsRouter.delete("/credentials", authValidation);

export default credentialsRouter;