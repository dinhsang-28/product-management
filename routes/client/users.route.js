const express = require('express');
const roter=express.Router();
const controller=require("../../controllers/clients/users.controllers");


roter.get('/not-friend',controller.notFriend);
module.exports = roter;