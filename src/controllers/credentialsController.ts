import { Request, Response } from "express";
import { Credential } from "../repositories/credentialsRepository.js";
import { createCredentialService, showCredentialService, deleteCredentialService } from "../services/credentialsService.js";

export async function createCredential(req: Request, res: Response) {
    const body: Credential = req.body;
    const {authorization} = req.headers;

    await createCredentialService(body, authorization);

    res.sendStatus(201);
}

export async function showCredentials(req: Request, res: Response) {
    const {id} = req.query;
    const {authorization} = req.headers;

    const credentials = await showCredentialService(Number(id), authorization);

    res.status(200).send(credentials);
}

export async function deleteCredential(req: Request, res: Response) {
    const { id } = req.params;
    const {authorization} = req.headers;

    await deleteCredentialService(Number(id), authorization);

    res.sendStatus(200);
}