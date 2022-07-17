import { Users } from "@prisma/client";
import prisma from "../config/database.js";

export type User = Omit<Users, "id">;

export async function getByEmail(email:string) {
    const user = await prisma.users.findFirst({
        where: {
            email
        }
    });

    return user;
}

export async function insertUser(user:User) {
    await prisma.users.create({
        data: user
    });
}