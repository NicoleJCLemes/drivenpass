import { Request, Response } from "express";
import { Card } from "../repositories/cardsRepository.js";
import { createCardService, showCardService, deleteCardService } from "../services/cardsService.js";

export async function createCard(req: Request, res: Response) {
    const body: Card = req.body;
    const {authorization} = req.headers;

    await createCardService(body, authorization);

    res.sendStatus(201);
}

export async function showCards(req: Request, res: Response) {
    const {id} = req.query;
    const {authorization} = req.headers;

    const cards = await showCardService(Number(id), authorization);

    res.status(200).send(cards);
}

export async function deleteCard(req: Request, res: Response) {
    const { id } = req.params;
    const {authorization} = req.headers;

    await deleteCardService(Number(id), authorization);

    res.sendStatus(200);
}