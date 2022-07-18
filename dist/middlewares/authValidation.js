export function authValidation(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        throw {
            type: "Unauthorized",
            message: "Token not found or inexistent"
        };
    }
    next();
}
