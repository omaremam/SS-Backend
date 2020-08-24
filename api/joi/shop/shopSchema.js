const Joi = require("joi");

const shopCreationSchema = Joi.object({
    shopOwnerUserId: Joi.string().required(),
    ShopName: Joi.string().min(1).max(1024).required(),
    AboutShop: Joi.string().min(10).max(1024 * 1024).required(),
    WorkingHours: Joi.string().min(1).max(128).required(),
    daysoff: Joi.string().min(1).max(128).required(),
    phoneNumber: Joi.string().min(4).max(128).required(),
    location: Joi.string().min(5).max(1024).required(),
    shopProducts: Joi.array().items(Joi.string().required()),
    shopImagesUrls: Joi.array().items(Joi.string().required())
})

module.exports = {
    "/shop": shopCreationSchema
}