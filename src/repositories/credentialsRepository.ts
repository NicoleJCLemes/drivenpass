import { Credentials } from "@prisma/client";
import prisma from "../config/database.js";

export type Credential = Partial<Credentials>;
export type CredentialWithNoId = Omit<Credentials, "id">

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