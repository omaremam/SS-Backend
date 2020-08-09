const Joi = require("joi");

const userCreationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required(),
    nationality: Joi.string(),
    phoneNumber: Joi.string(),
    age: Joi.string(),
    gender: Joi.string(),
    userType: Joi.string().required()
})

const userSignIn = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

const resetPassword = Joi.object({
    email: Joi.string().email().required(),
    code: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
})
module.exports = {
    "/user/register": userCreationSchema,
    "/user/signin": userSignIn,
    "/user/resetpassword": resetPassword
}