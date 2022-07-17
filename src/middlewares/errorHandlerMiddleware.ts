import { NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(error, req: Request, res: Response, next: NextFunction) {
    if(error.type === "Conflict") {
        return res.status(409).send(error.message)
    };

    if(error.type === "Unprocessable Entity") {
        return res.status(422).send(error.message)
    };

    res.status(500).send("Unknown error");
}