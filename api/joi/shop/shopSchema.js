const Joi = require("joi");

const shopCreationSchema = Joi.object({
    shopOwnerUserId: Joi.string().required(),
    address: Joi.object({
        location: Joi.object({ lat: Joi.number().required(), lng: Joi.number().required() }).required(),
        addressWording: Joi.string().required()
    }).required(),
    shopName: Joi.string().required(),
    shopPhoneNumber: Joi.string().required(),
    shopDescription: Joi.string().required(),
    workingHours: Joi.object({ from: Joi.string().required(), to: Joi.string().required() }).required(),
    shopProducts: Joi.array().items(Joi.string().required()).required(),
    shopImagesUrls: Joi.array().items(Joi.string().required()).required()
})

module.exports = {
    "/shop": shopCreationSchema
}