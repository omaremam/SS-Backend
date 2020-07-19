const Joi= require('joi');
const bcrypt= require('bcrypt');
const _= require('lodash');
const {User}= require('./app');
// for validating the user
const mongoose= require('mongoose');
const express= require('express');
const router= express.Router();
router.post('/', async(req, res)=>{

    const{ error }= validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
 
     
    user= await User.findOne({email: req.body.email });
    
    if (!user) return res.status(400).send('Invalid email or password');
    
    const validpassword= await bcrypt.compare(req.body.password, user.password);
    if(!validpassword) return res.status(400).send('Invalid email or password');
    res.status(200).send(user+" true");
    //res.status(200).send(true);
    // check for user auth pass
    });
    function validate(req){
        const schema={
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
        //Joi
    };
     return Joi.validate(req , schema);
     //Joi
    }
    module.exports= router;