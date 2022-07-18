import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.js";
import { networkValidation } from "../middlewares/schemasValidation.js";
import { createNetwork, showNetworks, deleteNetwork } from "../controllers/networksController.js";

const networksRouter = Router();

networksRouter.post("/networks", authValidation, networkValidation, createNetwork);
networksRouter.get("/networks", authValidation, showNetworks);
networksRouter.delete("/networks/:id", authValidation, deleteNetwork);

export default networksRouter;