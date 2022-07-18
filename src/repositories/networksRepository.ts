import { Networks } from "@prisma/client";
import prisma from "../config/database.js";

export type Network = Partial<Networks>;

export async function getByIdAndTitle(userId, title: string) {

    const titleExists = await prisma.networks.findFirst({
        where: {
            userId: parseInt(userId.id),
            title
        }
    });

    return titleExists;
}

export async function insert(networks, userId) {
    const network = {userId: Number(userId.id), ...networks}
    await prisma.networks.create({
        data: network
    });
}

export async function getByNetworkId(userId, id: number) {
    const network = await prisma.networks.findFirst({
        where: {
            id,
            userId: parseInt(userId.id)
        }
    });
    return network;
}

export async function getByUserId(userId) {
    const allNetworks = await prisma.networks.findMany({
        where: {
            userId: parseInt(userId.id)
        }
    });
    return allNetworks;
}

export async function deleteById(id: number) {
    const network = await prisma.networks.delete({
        where: {
            id
        }
    });
}