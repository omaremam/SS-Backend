const handleApiError = require("../../utils/ErrorHandler");
const Outing = require("./outing.model");

exports.createOuting = async (req,res) => {
    try{
        await new Outing(req.body).save()
        res.status(200).send({message: "Outing successfully created"})
    }
    catch(error){
        handleApiError(res,error,"createOuting")
    }
}

exports.getAllOutings = async (req,res) => {
    try{
        const outings = await Outing.find();
        if(!outings) return res.status(200).send([]);
        return res.status(200).send(outings);
    }
    catch(error){
        handleApiError(res,error,"getAllOutings")
    }
}