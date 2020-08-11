const Joi = require('joi');
const mongoose = require('mongoose');
const User = mongoose.model('User', new mongoose.Schema({
    //Schema
    name: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}));
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
        //Joi
    };
    return Joi.validate(user, schema);
    //Joi
}

const Services = mongoose.model('Services', new mongoose.Schema({
    nameOfService: String,
    typeOfService: String,
    expectedPriceRange: { from: String, to: String },
    location: { lat: Number, lng: Number },
    serviceDescription: String
}));

function validateService(service) {
    const validation = Joi.object({
        nameOfService: Joi.string(),
        typeOfService: Joi.string(),
        expectedPriceRange: Joi.object({ from: Joi.string(), to: Joi.string() }),
        location: Joi.object({ lat: Joi.number(), lng: Joi.number() }),
        serviceDescription: Joi.string()
    }).required()
    return Joi.validate(service, validation)
}


exports.User = User;
exports.validate = validateUser;
exports.Services = Services;
exports.validateService = validateService;