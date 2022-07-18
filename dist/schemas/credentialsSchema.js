import joi from "joi";
var credentialSchema = joi.object({
    title: joi.string().required(),
    url: joi.string().required(),
    nickName: joi.string().required(),
    password: joi.string().required(),
    userId: joi.number().required()
});
export { credentialSchema };
