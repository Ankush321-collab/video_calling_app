import mongoose from "mongoose";

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
},
{
        timestamps:true,
    },
    )

    const User=mongoose.model('User_s',Userschema)
    export default User