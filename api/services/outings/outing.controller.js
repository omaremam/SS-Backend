const handleApiError = require("../../utils/ErrorHandler");
const Outing = require("./outing.model");

exports.createOuting = async (req, res) => {
    try {
        await new Outing(req.body).save()
        res.status(200).send({ message: "Outing successfully created" })
    }
    catch (error) {
        handleApiError(res, error, "createOuting")
    }
}

exports.getAllActivities = async (req, res) => {
    try {
        const outings = await Outing.find({ outingType: "ACTIVITY" });
        if (!outings) return res.status(200).send([]);
        return res.status(200).send(outings);
    }
    catch (error) {
        handleApiError(res, error, "getAllActivities")
    }
}

exports.getAllEvents = async (req, res) => {
    try {
        const outings = await Outing.find({ outingType: "EVENT" });
        if (!outings) return res.status(200).send([]);
        return res.status(200).send(outings);
    }
    catch (error) {
        handleApiError(res, error, "getAllEvents")
    }
}

exports.deleteOuting = async (req,res) => {
    try{
        await Outing.findByIdAndDelete(req.headers.id);
        return res.status(200).send("Outing successfully deleted")
    }
    catch(error){
        handleApiError(res, error, "deleteOuting")
    }
}
