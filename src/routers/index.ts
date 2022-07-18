import { Router } from "express";
import userRouter from "./userRouter.js";
import cardsRouter from "./cardsRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import networksRouter from "./networksRouter.js";
import safeNotesRouter from "./safeNotesRouter.js";

const router = Router();

router.use(cardsRouter);
router.use(credentialsRouter);
router.use(networksRouter);
router.use(safeNotesRouter);
router.use(userRouter);

export default router;