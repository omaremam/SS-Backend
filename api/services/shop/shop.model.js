const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const shopSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    shopOwnerUserId: String,
    address: {
        location: { lat: Number, lng: Number },
        addressWording: String
    },
    shopName: String,
    shopPhoneNumber: String,
    shopDescription: String,
    workingHours: { from: String, to: String },
    shopProducts: [String],
    shopImagesUrls: [String],
    isApproved: Boolean
},
    {
        toJSON: {
            transform: function (doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    })

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;