const handleApiError = require("../../../utils/ErrorHandler");
const User = require("../user.model");
const bcrypt = require('bcryptjs');


exports.signUp = async (req, res) => {
    try {
        let user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.isApproved = user.userType != "Shop_Owner"
        await user.save();
        res.status(200).send({ message: "User Successfully registered" })
    }
    catch (error) {
        handleApiError(res, error, "signUp")
    }
}


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(200).send([]);
        res.status(200).send(users);
    }
    catch (error) {
        handleApiError(res, error, "getAllUsers");
    }
}
