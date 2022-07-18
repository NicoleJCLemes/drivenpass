import joi from "joi";
var networkSchema = joi.object({
    title: joi.string().required(),
    networkName: joi.string().required(),
    password: joi.string().required()
});
export { networkSchema };
