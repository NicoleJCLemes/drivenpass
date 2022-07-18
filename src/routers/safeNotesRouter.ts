import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.js";

const safeNotesRouter = Router();

safeNotesRouter.post("/credentials", authValidation);
safeNotesRouter.get("/credentials", authValidation);
safeNotesRouter.delete("/credentials", authValidation)

export default safeNotesRouter;