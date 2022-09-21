const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const registerSchema=new Schema({
    Name:{
        type:String,
        required:[true,'Name is required']
    },
    Email:{
        type:String,
        required:[true,'Email is required'],
        index : {
            unique:true
        },
        minlength:[6,'Email cant be Shorter than length 6'],
        maxlength:[64,'Email cant be greater than length 64']
    },
    Password:{
        type:String,
        required:[true,'Password is required'],
        index:{
            unique:true
        },
        minlength:[6,'Password should not be less than 8 characters of length'],
        maxlength:[20,'Password should not be greater than 20 characters of length']
    },
    ConfirmPassword:{
        type:String,
        required:[true,'ConfirmPassword is required'],
        index:{
            unique:true
        },
    },
    MobileNumber:{
        type:Number,
        required:[true,'Mobile number is required']
    }

},{timestamp:true});

const DataSchema=new Schema({
    Recipies:{
        type:String,
        required:true
    },
    Restaurant:{
        type:String
    },
    Address:{
        type:String
    }

},{timestamp:true});

const DataRegisters=mongoose.model('DataRegisters',DataSchema);
const registerModel=mongoose.model('registerModels',registerSchema);
module.exports={registerModel,DataRegisters};
