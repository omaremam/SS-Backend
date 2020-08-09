const handleApiError = require("../../utils/ErrorHandler");
const Service = require("./services.model");

exports.createService = async (req, res) => {
    try {
        await new Service(req.body).save();
        res.status(200).send({ message: "Service stored successfully" });
    }
    catch (error) {
        handleApiError(res, error, "createService")
    }
}

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        if(!services) return res.status(200).send([]);
        res.status(200).send(services);
    }
    catch (error) {
        handleApiError(res, error, "getAllService")
    }
}
