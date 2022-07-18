import { Credentials } from "@prisma/client";
import prisma from "../config/database.js";

export type Credential = Partial<Credentials>;

export async function getByIdAndTitle(userId, title: string) {
    
    const titleExists = await prisma.credentials.findFirst({
        where: {
            userId: parseInt(userId.id),
            title
        }
    });

    return titleExists;
}

export async function insert(credentials, userId) {
    const credential = {userId: Number(userId.id), ...credentials}
    await prisma.credentials.create({
        data: credential
    });
}

export async function getByCredencialId(userId, id: number) {
    const credential = await prisma.credentials.findFirst({
        where: {
            id,
            userId: parseInt(userId.id)
        }
    });
    return credential;
}

export async function getByUserId(userId) {
    const allCredentials = await prisma.credentials.findMany({
        where: {
            userId: parseInt(userId.id)
        }
    });
    return allCredentials;
}

export async function deleteById(id: number) {
    const credential = await prisma.credentials.delete({
        where: {
            id
        }
    });
}