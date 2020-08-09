const handleApiError = require("../../utils/ErrorHandler");
const AboutCity = require("./aboutcity.model");

exports.createAboutCity = async (req, res) => {
    try {
        const ab = await AboutCity.find();
        if (ab.length != 0) return res.status(400).send({ error: "About city description already exists if you wish to edit it use same end point with PUT instead" })
        await new AboutCity(req.body).save();
        res.status(200).send({ message: "Successfully added description about city" });
    }
    catch (error) {
        handleApiError(res, error, "createAboutCity");
    }
}

exports.editAboutCity = async (req, res) => {
    try {
        const aboutCity = await AboutCity.findOne();
        if (!aboutCity) return res.status(400).send({ error: "About city description does not exist create one using POST" })
        aboutCity.cityDescription = req.body.cityDescription;
        await aboutCity.save()
        res.status(200).send({message: "About city successfully edited"})
    }
    catch (error) {
        handleApiError(res, error, "editAboutCity");
    }
}

exports.getAboutCity = async(req,res)=> {
    try{
        const aboutCity = await AboutCity.find();
        if(!aboutCity) return res.status(200).send([]);
        res.status(200).send(aboutCity[0])
    }
    catch(error){
        handleApiError(res,error,"getAboutCity")
    }
}