import joi from "joi";
var cardSchema = joi.object({
    title: joi.string().required(),
    cardNumber: joi.string().required(),
    cardName: joi.string().required(),
    securityCode: joi.string().required(),
    expirationDate: joi.string().required(),
    password: joi.string().required(),
    isVirtual: joi.boolean().required(),
    type: joi.string().valid("debit", "credit", "dual").required()
});
export { cardSchema };
