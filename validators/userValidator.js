import Joi from "joi";

const userValidator = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    role: Joi.string().valid("ADMIN", "TEACHER", "STUDENT").optional()
})

export default userValidator;