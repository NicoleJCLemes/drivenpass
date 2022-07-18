import { credentialSchema } from "../schemas/credentialsSchema.js";
import { userSchema } from "../schemas/userSchema.js";
import { cardSchema } from "../schemas/cardsSchema.js";
import { noteSchema } from "../schemas/safeNotesSchema.js";
import { networkSchema } from "../schemas/networksSchema.js";
export function userValidation(req, res, next) {
    var validation = userSchema.validate(req.body, { abortEarly: true });
    if (validation.error) {
        throw {
            type: "Unprocessable Entity",
            message: validation.error.details[0].message
        };
    }
    ;
    next();
}
export function credentialValidation(req, res, next) {
    var validation = credentialSchema.validate(req.body, { abortEarly: true });
    if (validation.error) {
        throw {
            type: "Unprocessable Entity",
            message: validation.error.details[0].message
        };
    }
    ;
    next();
}
export function cardValidation(req, res, next) {
    var validation = cardSchema.validate(req.body, { abortEarly: true });
    if (validation.error) {
        throw {
            type: "Unprocessable Entity",
            message: validation.error.details[0].message
        };
    }
    ;
    next();
}
export function noteValidation(req, res, next) {
    var validation = noteSchema.validate(req.body, { abortEarly: true });
    if (validation.error) {
        throw {
            type: "Unprocessable Entity",
            message: validation.error.details[0].message
        };
    }
    ;
    next();
}
export function networkValidation(req, res, next) {
    var validation = networkSchema.validate(req.body, { abortEarly: true });
    if (validation.error) {
        throw {
            type: "Unprocessable Entity",
            message: validation.error.details[0].message
        };
    }
    ;
    next();
}
