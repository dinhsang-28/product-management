const express = require('express');
const roter=express.Router();
const controller=require("../../controllers/clients/cart.controllers");

roter.get("/",controller.index)
roter.post("/add/:productId",controller.addPost)
roter.get("/delete/:productId",controller.delete)
roter.get("/update/:productId/:quantity",controller.update)

module.exports=roter;