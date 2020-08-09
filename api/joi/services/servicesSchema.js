const Joi = require("joi");

const serviceCreationSchema = Joi.object({
    serviceName: Joi.string().required(),
    serviceType: Joi.string().required(),
    serviceDescription: Joi.string().required(),
    expectedPriceRange: Joi.object({
        from: Joi.string().required(),
        to: Joi.string().required()
    }).required()
}).required()

module.exports = {
    "/service": serviceCreationSchema
}