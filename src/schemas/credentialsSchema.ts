import joi from "joi";

const credentialSchema = joi.object({
    title: joi.string().required(),
    url: joi.string().required(),
    nickName: joi.string().required(),
    password: joi.string().required()
});

export { credentialSchema };