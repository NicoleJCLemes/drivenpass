import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.js";
import { cardValidation } from "../middlewares/schemasValidation.js";
import { createCard, showCards, deleteCard } from "../controllers/cardsController.js";
var cardsRouter = Router();
cardsRouter.post("/cards", authValidation, cardValidation, createCard);
cardsRouter.get("/cards", authValidation, showCards);
cardsRouter["delete"]("/cards/:id", authValidation, deleteCard);
export default cardsRouter;
