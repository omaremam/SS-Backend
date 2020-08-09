const handleApiError = require("../../../utils/ErrorHandler");
const User = require("../user.model");
const bcrypt = require('bcryptjs');
var nodemailer = require("nodemailer");


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

exports.signIn = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password');
        const validpassword = await bcrypt.compare(req.body.password, user.password);
        if (!validpassword) return res.status(400).send('Invalid email or password');
        res.status(200).send(user);
    }
    catch (error) {
        handleApiError(res, error, "signIn")
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password")
        //.select("-resetPasswordCode");
        if (!users) return res.status(200).send([]);
        res.status(200).send(users);
    }
    catch (error) {
        handleApiError(res, error, "getAllUsers");
    }
}

exports.requestPasswordResetCode = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.headers.email });
        if (!user) return res.status(400).send({ error: "User does not exist" });
        user.resetPasswordCode = Math.random().toString(36).substring(7);
        //sendEmail(req.headers.email, user.resetPasswordCode);
        await user.save();
        res.status(200).send({ message: "Successfully sent email for password reset" })
    }
    catch (error) {
        handleApiError(res, error, "requestPasswordResetCode");
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send({ error: "User not found" });
        if (user.resetPasswordCode != req.body.code) return res.status(400).send({ error: "Password reset code is not correct" });
        user.resetPasswordCode = undefined;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.newPassword, salt);
        await user.save()
        res.status(200).send({message: "Password reset successful"})
    }
    catch (error) {
        handleApiError(res,error,"resetPassword")
    }
}


function sendEmail(email, code) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: "dev@courzerve.com",
            serviceClient: key.client_id,
            privateKey: key.private_key
        }
    });

    const teamMailOption = {
        from: 'oemam6062379@gmail.com', // sender address
        to: [
            email
        ], // list of receivers
        subject: `A password reset request is sent`, // Subject line
        html: `${code}`
    };

    transporter.sendMail(teamMailOption, function (err, info) {
        if (err) console.log(err);
    });
}