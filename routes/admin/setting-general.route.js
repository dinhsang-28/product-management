const express = require('express');
const multer = require('multer');
const router=express.Router();
const upload = multer();
const controller=require("../../controllers/admin/setting.controller");
const uploadCloud=require("../../middleware/admin/uploadCloud.middleware");

router.get("/gerenal",controller.gerenal);
router.patch("/gerenal",upload.single("logo"),uploadCloud.upload,controller.gerenalPatch);

module.exports=router;