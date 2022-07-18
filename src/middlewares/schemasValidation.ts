import { NextFunction, Request, Response } from "express";
import { credentialSchema } from "../schemas/credentialsSchema.js";
import { userSchema } from "../schemas/userSchema.js";
import { cardSchema } from "../schemas/cardsSchema.js";
import { noteSchema } from "../schemas/safeNotesSchema.js";

export function userValidation(req: Request, res: Response, next: NextFunction) {

    const validation = userSchema.validate(req.body, {abortEarly: true});
    if (validation.error) {
        throw {
            type: "Unprocessable Entity",
            message: validation.error.details[0].message
        }
    };
    next();
}

export function credentialValidation(req: Request, res: Response, next: NextFunction) {
    const validation = credentialSchema.validate(req.body, {abortEarly: true});
    if (validation.error) {
        throw {
            type: "Unprocessable Entity",
            message: validation.error.details[0].message
        }
    };
    next();
}

export function cardValidation(req: Request, res: Response, next: NextFunction) {
    const validation = cardSchema.validate(req.body, {abortEarly: true});
    if (validation.error) {
        throw {
            type: "Unprocessable Entity",
            message: validation.error.details[0].message
        }
    };
    next();
}

export function noteValidation(req: Request, res: Response, next: NextFunction) {
    const validation = noteSchema.validate(req.body, {abortEarly: true});
    if (validation.error) {
        throw {
            type: "Unprocessable Entity",
            message: validation.error.details[0].message
        }
    };
    next();
}