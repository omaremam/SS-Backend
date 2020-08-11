const app = require("./app")
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const error = app.validateService(req.body);
   // if (error) return res.status(400).send(error);

    await new app.Services(req.body).save()

    res.status(200).send({message: "Service successfully stored"})
})

router.get('/', async (req, res) => {
    const services = await app.Services.find();
    if(!services) return res.status(200).send([]);

    return res.status(200).send(services);
})

module.exports= router;