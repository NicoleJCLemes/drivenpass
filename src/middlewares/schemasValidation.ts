import { NextFunction, Request, Response } from "express";
import { signUpSchema } from "../schemas/userSchema.js";

export function signUpValidation(req: Request, res: Response, next: NextFunction) {

    const validation = signUpSchema.validate(req.body, {abortEarly: true});
    if (validation.error) {
        throw {
            type: "Unprocessable Entity",
            message: validation.error.details[0].message
        }
    };
    next();
}