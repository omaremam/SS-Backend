const Joi = require("joi");

const userCreationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    nationality: Joi.string(),
    phoneNumber: Joi.string(),
    age: Joi.string(),
    gender: Joi.string(),
    userType: Joi.string().required()
})

module.exports = {
    "/user/register": userCreationSchema
}