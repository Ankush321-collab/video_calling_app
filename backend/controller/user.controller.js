import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { StreamChat } from "stream-chat";

// ---------------- SIGNUP ----------------
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: `Missing fields: ${[
          !fullname && "fullname",
          !email && "email",
          !password && "password",
        ].filter(Boolean).join(", ")}`,
        success: false,
      });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({
        message: "Email already exists. Use another.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(200).json({
      message: "New user created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

// ---------------- LOGIN ----------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: `Missing fields: ${[!email && "email", !password && "password"]
          .filter(Boolean)
          .join(", ")}`,
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Password does not match!",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_PASSWORD,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userResponse } = user.toObject();

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: userResponse,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
    });
  }
};

// ---------------- LOGOUT ----------------
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Internal server error during logout",
      success: false,
    });
  }
};

// ---------------- ONBOARD ----------------
export const onboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullname, bio, nativelanguage, learninglanguage, location, profilepic } = req.body;

    const missingFields = [
      !fullname && "fullname",
      !bio && "bio",
      !nativelanguage && "nativelanguage",
      !learninglanguage && "learninglanguage",
      !location && "location",
    ].filter(Boolean);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields,
        success: false,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isonboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // ---------------- STREAM CHAT UPLOAD ----------------
    try {
      const client = StreamChat.getInstance(
        process.env.video_key,
        process.env.video_secret
      );

      await client.upsertUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullname,
        image: updatedUser.profilepic || "https://randomuser.me/api/portraits/lego/2.jpg",
      });

      console.log(`✅ Stream user updated for ${updatedUser.fullname}`);
    } catch (err) {
      console.error("❌ Error updating Stream user:", err.message);
    }

    return res.status(200).json({
      message: "User onboarded successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong during onboarding",
      success: false,
    });
  }
};


