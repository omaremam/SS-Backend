const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const shopSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    shopOwnerUserId: String,
    ShopName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1024
    },
    AboutShop: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1024 * 1024
    },
    WorkingHours: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 128
    },
    daysoff: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 128
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    }, location: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    shopProducts: [String],
    shopImagesUrls: [String],
    isApproved: Boolean,
    commercialRegNum: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 25
    },
    IDnumber: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 14
    }
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