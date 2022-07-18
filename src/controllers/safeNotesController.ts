import { Request, Response } from "express";
import { createNoteService, showNoteService, deleteNoteService } from "../services/safeNotesService.js";
import { Note } from "../repositories/safeNotesRepository.js";

export async function createNote(req: Request, res: Response) {
    const body: Note = req.body;
    const {authorization} = req.headers;

    await createNoteService(body, authorization);

    res.sendStatus(201);
}

export async function showNotes(req: Request, res: Response) {
    const {id} = req.query;
    const {authorization} = req.headers;

    const notes = await showNoteService(Number(id), authorization);

    res.status(200).send(notes);
}

export async function deleteNote(req: Request, res: Response) {
    const { id } = req.params;
    const {authorization} = req.headers;

    await deleteNoteService(Number(id), authorization);

    res.sendStatus(200);
}