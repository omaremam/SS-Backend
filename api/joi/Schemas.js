const UserSchema = require("./auth/authSchema");
const AboutCitySchema = require("./aboutcity/aboutcitySchema")
const ShopSchema = require("./shop/shopSchema")
const servicesSchema = require("./services/servicesSchema");
const outingSchema = require("./outings/outingsSchema")


module.exports = Object.assign(
    {},
    UserSchema,
    AboutCitySchema,
    ShopSchema,
    servicesSchema,
    outingSchema
);