const Joi = require("joi");

const outingCreationSchema = Joi.object({
    outingName: Joi.string().required(),
    outingDescription: Joi.string().required(),
    outingPrice: Joi.string().required(),
    howToReserve: Joi.string().required(),
}).required()


module.exports = {
    "/outing": outingCreationSchema
}