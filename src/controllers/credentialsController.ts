import { Request, Response } from "express";
import { Credential } from "../repositories/credentialsRepository.js";
import { createCredentialService } from "../services/credentialsService.js";

export async function createCredential(req: Request, res: Response) {
    const body: Credential = req.body;
    const {authorization} = req.headers;

    await createCredentialService(body, authorization);

    res.sendStatus(201);
}