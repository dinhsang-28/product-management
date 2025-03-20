const express = require('express');
const roter=express.Router();
const controller=require("../../controllers/clients/search.controllers");

roter.get('/',controller.index )

module.exports=roter;