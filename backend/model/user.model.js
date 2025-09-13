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
       default:"",
    },
    nativelanguage:{
        type:String,
       default:"",
    },
    learninglanguage:{
        type:String,
       default:"",
    },
    profilepic:{
        type:String,
        default:"",
       
    },
    isonboarded:{
        type:Boolean,
        default:false,
    },
    location:{
        type:String,
        default:"",
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ],
},
{
        timestamps:true,
    },
    )

    const User=mongoose.model('User',Userschema)
    export default User