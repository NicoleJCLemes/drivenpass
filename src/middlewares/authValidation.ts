import { NextFunction, Request, Response } from "express";

export function authValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if(!authorization) {
        throw {
            type: "Unauthorized",
            message: "Token not found or invalid"
        }
    }

}