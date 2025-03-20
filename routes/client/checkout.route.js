const express = require('express');
const roter=express.Router();
const controller=require("../../controllers/clients/checkout.controllers");

roter.get('/',controller.index)
roter.post("/order",controller.order)
roter.get('/success/:orderId',controller.success)
module.exports=roter;