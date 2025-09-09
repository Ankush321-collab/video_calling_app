import User from "../model/user.model.js";
import bcrypt from 'bcrypt'

export const signup=async(req,res)=>{
    try{
        const {fullname,email,password}=req.body

        if(!fullname ||!email ||!password){
            return res.status(400).json({
                message:`missing fields: ${[
                    !fullname || "fullname",
                    !email || "email",
                    !password || "password"
                ].filter(Boolean).join(",")}`,
                success:false
            });
        }

        const olduser=await User.findOne({email});
        if(olduser){
            return res.status(409).json({
                message:"Email already Exist Use another",
                success:false,
            })
        }
        // hsh password
        const hashpassword=await bcrypt.hash(password,10);

        // new user creation
        const newuser=new User({
            fullname,
            email,
            password:hashpassword
        })
        await newuser.save();
        return res.status(200).json({
            message:"NEW user created succesfully",
            success:true,
        })


    }
   catch (error) {
    const msg = error?.response?.data?.message || error.message || "Something went wrong";

    return res.status(500).json({
        message: msg,
        success: false
    });
}

}