const express = require('express');
const roter=express.Router();
const controller=require("../../controllers/clients/home.controllers");

roter.get('/',controller.index )

    module.exports=roter;