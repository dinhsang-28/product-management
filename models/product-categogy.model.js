const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({    
title:String,
parent_id:{
    type:String,
    default:false
},
description:String,
thumbnail:String,
status:String,
position:Number,
slug: { 
    type: String, 
    slug: "title",
    unique:true  //duy nhat
},
deleted:{
    type:Boolean,
    default:false
},
deletedAt:Date
    },{
        timestamps:true
    });
const ProductCategogy = mongoose.model('ProductCategogy', productSchema,"product-categogy");

module.exports=ProductCategogy;