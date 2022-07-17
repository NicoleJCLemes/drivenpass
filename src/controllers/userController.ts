import { Request, Response } from "express";
import { User } from "../repositories/userRepository.js";
import { userService, userLoginService } from "../services/userService.js";

export async function signUp (req: Request, res: Response) {
    const body: User = req.body;
    
    await userService(body);

    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const body: User = req.body;
    
    const token = await userLoginService(body);

    res.status(200).send(token);
}