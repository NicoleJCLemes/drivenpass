import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.js";

const cardsRouter = Router();

cardsRouter.post("/credentials", authValidation);
cardsRouter.get("/credentials", authValidation);
cardsRouter.delete("/credentials", authValidation)

export default cardsRouter;