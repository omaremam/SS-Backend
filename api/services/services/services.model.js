const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    serviceName: String,
    serviceType: String,
    expectedPriceRange: { from: String, to: String },
    serviceContents: [
        {
            contentName: String,
            contentDescription: String
        }
    ]
},
    {
        toJSON: {
            transform: function (doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
)

const Service = mongoose.model("Services", servicesSchema);
module.exports = Service;