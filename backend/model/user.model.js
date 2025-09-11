import mongoose from "mongoose";
import validator from 'email-validator'

const Userschema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minlength:6,
        trim:true
    },
    email:{
        type:String,
        required:true,
        minlength:6,
        trim:true,
        validate:(v)=>validator.validate(v),
        messgae:"invalid email format"
        
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        trim:true,
    },
    bio:{
        type:String,
        required:true,
    },
    nativelanguage:{
        type:String,
        required:true,
        enum:["nepali","hindi","english"]
    },
    learninglanguage:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        required:true
    },
    isonboarded:{
        type:Boolean,
        default:false,
    },
    location:{
        type:String,
        required:true
    }
},
{
        timestamps:true,
    },
    )

    const User=mongoose.model('User_s',Userschema)
    export default User