const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const aboutCitySchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    cityDescription: String
}, {
    toJSON: {
        transform: function (doc, ret, options) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
}
)

const AboutCity = mongoose.model("Aboutcity", aboutCitySchema);
module.exports = AboutCity