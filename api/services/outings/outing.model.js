const mongoose = require("mongoose");

const outingSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    outingName: String,
    outingPrice: String,
    outingDescription: String,
    howToReserve: String
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

const Outing = mongoose.model("outings",outingSchema);
module.exports = Outing;