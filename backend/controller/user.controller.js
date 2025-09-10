import User from "../model/user.model.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import cookie from 'cookie-parser'

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
            user:newuser
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



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: `Missing fields: ${[
                    !email && "email",
                    !password && "password"
                ].filter(Boolean).join(", ")}`,
                success: false
            });
        }

        // find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User is not signed up or not in database",
                success: false,
            });
        }

        // compare password
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({
                message: "Password does not match!",
                success: false,
            });
        }

        // generate JWT
        const jwt_password = process.env.JWT_PASSWORD;
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            jwt_password,
            { expiresIn: "1d" }
        );

        // store token in cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        // remove password from response
        const { password: _, ...userResponse } = user.toObject();

        // success response
        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: userResponse,
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Something went wrong",
            success: false
        });
    }
};

export const logout=async(req,res)=>{
    try{
        res.clearCookie("jwt",{
            httpOnly:true,
 sameSite: "Strict",
             secure:process.env.NODE_ENV==="production"

        })
        res.status(200).json({
            message:"Logout sucessfully",
            success:false
        })

    }
    catch(error){
            console.error("logout error:", error);
    res.status(500).json({
      message: "Internal server error during logout",
      success: false,

    })
}
}



