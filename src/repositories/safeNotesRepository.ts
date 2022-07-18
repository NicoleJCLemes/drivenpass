import { SafeNotes } from "@prisma/client";
import prisma from "../config/database.js";

export type Note = Partial<SafeNotes>;

export async function getByIdAndTitle(userId, title: string) {

    const titleExists = await prisma.safeNotes.findFirst({
        where: {
            userId: parseInt(userId.id),
            title
        }
    });

    return titleExists;
}

export async function insert(notes, userId) {
    const note = {userId: Number(userId.id), ...notes}
    await prisma.safeNotes.create({
        data: note
    });
}

export async function getByNoteId(userId, id: number) {
    const note = await prisma.safeNotes.findFirst({
        where: {
            id,
            userId: parseInt(userId.id)
        }
    });
    return note;
}

export async function getByUserId(userId) {
    const allNotes = await prisma.safeNotes.findMany({
        where: {
            userId: parseInt(userId.id)
        }
    });
    return allNotes;
}

export async function deleteById(id: number) {
    const note = await prisma.safeNotes.delete({
        where: {
            id
        }
    });
}