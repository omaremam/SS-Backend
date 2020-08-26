const Joi = require("joi");

const serviceCreationSchema = Joi.object({
    serviceName: Joi.string().required(),
    serviceType: Joi.string().required(),
    expectedPriceRange: Joi.object({
        from: Joi.string().required(),
        to: Joi.string().required()
    }),
    serviceContents: Joi.array().items(Joi.object({
        contentName: Joi.string().required(),
        contentDescription: Joi.string().required()
    })).required()
})

module.exports = {
    "/service": serviceCreationSchema
}