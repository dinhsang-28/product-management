const express = require('express');
const roter=express.Router();
const controller=require("../../controllers/clients/products.controllers");
roter.get('/',controller.index )
roter.get('/:slug',controller.detail )
    module.exports=roter;