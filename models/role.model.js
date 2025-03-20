const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({    
title:String,
description:String,
permissions:{    
    type:Array,
    default:[]
},
deleted:{
    type:Boolean,
    default:false
},
deletedAt:Date
    },{
        timestamps:true
    });
const Role = mongoose.model('Role', productSchema,"roles");

module.exports=Role;