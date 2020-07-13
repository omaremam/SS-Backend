const bcrypt= require('bcrypt');
const _= require('lodash');
const {User, validate}= require('./app');
const mongoose= require('mongoose');
const express= require('express');
const router= express.Router();

router.post('/', async(req, res)=>{
  const{ error }= validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if there is error in auth
   
  let user= await User.findOne({email: req.body.email });
  // search for the current the user by email in database to make sure if the user already registered or not
  // findbyid [serach by id]
  if (user) return res.status(400).send('User already registered');
  // if (user) : it means the user in db
  //then code will return 400 and send message
  //else will create new user
  
  /** 
  user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  });
  without using lodash
  **/
 user = new User(_.pick(req.body,["name","email","password"]));
 const salt= await bcrypt.genSalt(10);
 user.password = await bcrypt.hash(user.password,salt);
  await user.save();
  
  
  //res.send(user);
  //to send user with ID and all data

  
 
  /** 
  res.send({
    name: user.name,
    email: user.email
  });
  // using without using lodash to send user name and email only
  **/
 
  
  res.send(_.pick(user ,["_id","name", "email"]));
  //using lodash
});
module.exports= router;