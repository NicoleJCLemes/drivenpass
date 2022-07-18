import { 
    Note, 
    getByIdAndTitle, 
    insert, 
    getByUserId, 
    getByNoteId, 
    deleteById } from "../repositories/safeNotesRepository.js";
import jwt from "jsonwebtoken";
import "../config/setup.js";

export async function createNoteService(body: Note, authorization: string) {
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    const titleExists = await getByIdAndTitle(userId, body.title);

    if(titleExists) {
        throw {
            type: "Conflict",
            message: "You already has a note with this title"
        }
    }
    
    const card = {
        title: body.title,
        note: body.note
    }

    await insert(card, userId);
}

export async function showNoteService(id: number, authorization: string) {
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);
    
    const notesByUserId = await getByUserId(userId);
    
    if(id) {
        let note = await getByNoteId(userId, id);
        if(!note) {
            throw {
                type: "Not Found",
                message: "This note is inexistent or invalid"
            }
        }
        
        return note;
    }

    return notesByUserId;
}

export async function deleteNoteService(id: number, authorization: string) {
    const token = authorization.replace("Bearer", "").trim();
    const userId = jwt.verify(token, process.env.SECRET_KEY);

    const noteById = await getByNoteId(userId, id);
    if(noteById) {
        await deleteById(id);
    } else {
        throw {
            type: "Not Found",
            message: "This note is inexistent or invalid"
        }
    }
}