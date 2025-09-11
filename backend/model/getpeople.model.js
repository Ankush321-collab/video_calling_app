import mongoose from "mongoose";

const friendSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["pending","approved"],
        default:"pending"
    }

},{
    timestamps:true
})

 const friend=mongoose.model("FriendsReques",friendSchema)
 export default friend