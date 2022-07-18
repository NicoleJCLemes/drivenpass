import { Cards } from "@prisma/client";
import prisma from "../config/database.js";

export type Card = Partial<Cards>

export async function insert(cards, userId) {
    const card = {userId: Number(userId.id), ...cards}
    await prisma.cards.create({
        data: card
    });
}

export async function getByIdAndTitle(userId, title: string) {

    const titleExists = await prisma.cards.findFirst({
        where: {
            userId: parseInt(userId.id),
            title
        }
    });

    return titleExists;
}

export async function getByUserId(userId) {
    const allCards = await prisma.cards.findMany({
        where: {
            userId: parseInt(userId.id)
        }
    });
    return allCards;
}

export async function getByCardId(userId, id: number) {
    const card = await prisma.cards.findFirst({
        where: {
            id,
            userId: parseInt(userId.id)
        }
    });
    return card;
}