const Joi= require ('joi');
const mongoose= require ('mongoose');
const express= require('express');
const users= require ('./logger');
const auth= require('./auth');
const app=express();
const services = require("./services")

mongoose.connect('mongodb://raghda:Gho0nima@cluster0-shard-00-00.1b2jk.mongodb.net:27017,cluster0-shard-00-01.1b2jk.mongodb.net:27017,cluster0-shard-00-02.1b2jk.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-nbrdp5-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
// this will create database in mongodb
.then(()=> console.log('connected to mongodb'))
.catch(err=> console.error('not connected to monogodb'));

app.use(express.json());
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/service',services);
//app.listen(3000,()=> console.log('\n' +'listening on port 3000 .....//'));
const port = process.env.PORT || 3000;
app.listen(port,()=> console.log('listening on port no. : ' + port));
