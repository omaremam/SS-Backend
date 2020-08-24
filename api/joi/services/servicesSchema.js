const Joi = require("joi");

const serviceCreationSchema = Joi.object({
    serviceName: Joi.string().required(),
    serviceType: Joi.string().required(),
    serviceDescription: Joi.string().required(),
    expectedPriceRange: Joi.object({
        from: Joi.string().required(),
        to: Joi.string().required()
    }),
    busStops: Joi.array().items(Joi.object({
        location: Joi.object({
            lat: Joi.number().required(),
            lng: Joi.number().required(),
            loc: Joi.string().required()
        }).required(),
        busArrivalTimes: Joi.array().items(Joi.string().required())
    }).required())
}).required()

module.exports = {
    "/service": serviceCreationSchema
}