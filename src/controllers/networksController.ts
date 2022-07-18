import { Request, Response } from "express";
import { createNetworkService, showNetworkService, deleteNetworkService } from "../services/networksService.js";
import { Network } from "../repositories/networksRepository.js";

export async function createNetwork(req: Request, res: Response) {
    const body: Network = req.body;
    const {authorization} = req.headers;

    await createNetworkService(body, authorization);

    res.sendStatus(201);
}

export async function showNetworks(req: Request, res: Response) {
    const {id} = req.query;
    const {authorization} = req.headers;

    const networks = await showNetworkService(Number(id), authorization);

    res.status(200).send(networks);
}

export async function deleteNetwork(req: Request, res: Response) {
    const { id } = req.params;
    const {authorization} = req.headers;

    await deleteNetworkService(Number(id), authorization);

    res.sendStatus(200);
}