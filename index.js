const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect('mongodb://raghda:Gho0nima@cluster0-shard-00-00.1b2jk.mongodb.net:27017,cluster0-shard-00-01.1b2jk.mongodb.net:27017,cluster0-shard-00-02.1b2jk.mongodb.net:27017/test?authSource=admin&replicaSet=atlas-nbrdp5-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
    // this will create database in mongodb
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.error('not connected to monogodb'));

app.use(express.json());
//app.listen(3000,()=> console.log('\n' +'listening on port 3000 ...'));
require("./api/services/auth/basic/user.basic.routes")(app);
require("./api/services/aboutcity/aboutcity.routes")(app);
require("./api/services/shop/basic/shop.basic.routes")(app);
require("./api/services/services/services.routes")(app);
require("./api/services/outings/outing.routes")(app)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port ...'));