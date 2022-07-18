import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.js";

const networksRouter = Router();

networksRouter.post("/credentials", authValidation);
networksRouter.get("/credentials", authValidation);
networksRouter.delete("/credentials", authValidation)

export default networksRouter;