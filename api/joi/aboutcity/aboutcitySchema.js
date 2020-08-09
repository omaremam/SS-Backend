const Joi = require("joi");

const createAboutCity = Joi.object({
    cityDescription: Joi.string().required()
})

module.exports = {
    "/aboutcity": createAboutCity
}