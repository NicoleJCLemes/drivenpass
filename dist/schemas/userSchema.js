import joi from "joi";
var userSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(10).required()
});
export { userSchema };
