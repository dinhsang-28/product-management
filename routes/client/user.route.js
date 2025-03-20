const express = require('express');
const roter=express.Router();
const controller=require("../../controllers/clients/user.controllers");
const validate = require("../../validates/client/user.validate");
const authMiddleWare = require("../../middleware/client/auth.middleware");

roter.get('/register',controller.register)
roter.post('/register',validate.register,controller.registerPost)
roter.get('/login',controller.login)
roter.post('/login',validate.loginPost,controller.loginPost)
roter.get('/logout',controller.logout)
roter.get('/password/forgot',controller.forgotPassword)
roter.post('/password/forgot',validate.forgotPasswordPost,controller.forgotPasswordPost)
roter.get('/password/otp',controller.otpPassword)
roter.post('/password/otp',controller.otpPasswordPost)
roter.get('/password/reset',controller.resetPassword)
roter.post('/password/reset',validate.resetPasswordPost,controller.resetPasswordPost)
roter.get('/info',authMiddleWare.requireAuth,controller.info)
module.exports=roter;