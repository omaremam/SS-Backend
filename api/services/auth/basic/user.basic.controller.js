const handleApiError = require("../../../utils/ErrorHandler");
const User = require("../user.model");
const bcrypt = require('bcryptjs');
var nodemailer = require("nodemailer");


exports.signUp = async (req, res) => {
    try {
        let user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.isApproved = false;
        await user.save();
        sendConfirmationMail(req.body.email, `http://3.16.119.225:3000/user/confirm/${user._id}`)
        res.status(200).send({ message: "User Successfully registered" })
    }
    catch (error) {
        handleApiError(res, error, "signUp")
    }
}

exports.approveUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(400).send("User not found")
        user.isApproved = true;
        await user.save()
        return res.status(200).sendFile("../../../utils/confirmemail.html")
    }
    catch (error) {
        handleApiError(res, error, "approveUser")
    }
}

exports.signIn = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password');
        if (!user.isApproved) return res.status(400).send("User not confirmed yet")
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
            .select("-resetPasswordCode");
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
        sendEmail(req.headers.email, user.resetPasswordCode);
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
        res.status(200).send({ message: "Password reset successful" })
    }
    catch (error) {
        handleApiError(res, error, "resetPassword")
    }
}


function sendEmail(email, code) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sharmelshiikh@gmail.com',
            pass: 'sharm2020'
        }
    });

    const teamMailOption = {
        from: 'oemam6062379@gmail.com', // sender address
        to: [
            email
        ], // list of receivers
        subject: `A password reset request is sent`, // Subject line
        html: `<h3><strong>Hello!</strong></h3>
        <p>We received a request to reset your password.</p>
        <p><strong>You need to enter the following code:</strong></p>
        <h2 style="color:cornflowerblue;"><strong>${code}</strong></h2>
        <h5><p>If you did not request a new password you need to secure your account.</p></h5>
        <p><strong>Thanks,</strong></p>`
    };

    transporter.sendMail(teamMailOption, function (err, info) {
        if (err) console.log(err);
    });
}

function sendConfirmationMail(email, url) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sharmelshiikh@gmail.com',
            pass: 'sharm2020'
        }
    });

    const teamMailOption = {
        from: 'oemam6062379@gmail.com', // sender address
        to: [
            email
        ], // list of receivers
        subject: `Account confirmation Sharm ElSheikh`, // Subject line
        html: `<html>
    

        <h2 style="color:  rgb(122,187,232);"><strong>Hello!</strong></h2>
        <h3><p style="color: rgb(122,187,232);">Your registeration is almost done!</p></h3>
        <style>
            
            </style>
        <p>Press the below button to verify your email address to complete creating your account:</p>
        <head >
            
            <style>
              .button {
                background-color: #2a8307;
                border: solid;
                color: white;
                padding: 10px 25px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 20px;
                margin: 4px 2px;
                cursor: pointer;
              }
            </style>
          </head>
          <body>
            <a href="${url}" class="button">Verify my Account</a>
          </body>
        <h4><p style="color:rgb(85,95,107);">We require a verified email address so you can take the full advantage of all the app features, and also you can safely recover your account in the future.</p></h4>
        
        <h4><p style="color:rgb(85,95,107);">If you did not recently attempt to create a new account with this email address. you can safely disregard this email.</p></h4>
        <h4><p style="color:rgb(85,95,107);">Thanks for helping us ensure your new account is secure,</p></html>
        </h4>`
    };

    transporter.sendMail(teamMailOption, function (err, info) {
        if (err) console.log(err);
    });
}