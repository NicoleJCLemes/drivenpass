import { Router } from "express";
import { createNote, deleteNote, showNotes } from "../controllers/safeNotesController.js";
import { authValidation } from "../middlewares/authValidation.js";
import { noteValidation } from "../middlewares/schemasValidation.js";
var safeNotesRouter = Router();
safeNotesRouter.post("/safe-notes", authValidation, noteValidation, createNote);
safeNotesRouter.get("/safe-notes", authValidation, showNotes);
safeNotesRouter["delete"]("/safe-notes/:id", authValidation, deleteNote);
export default safeNotesRouter;
