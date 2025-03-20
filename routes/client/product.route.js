const express = require('express');
const roter=express.Router();
const controller=require("../../controllers/clients/products.controllers");
roter.get('/',controller.index )
roter.get('/:slugCategogy',controller.categogy)
roter.get('/detail/:slugProduct',controller.detail )
    module.exports=roter;