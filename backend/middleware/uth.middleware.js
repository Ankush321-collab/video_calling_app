import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protecteroute = async (req, res, next) => {
  try {
    // get token from cookies
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
        success: false,
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD); // use your secret
    if (!decoded) {
      return res.status(401).json({
        message: "Unauthorized - Invalid token",
        success: false,
      });
    }

    // check if user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
        success: false,
      });
    }

    // attach user to request
    req.user = user;

    // allow request to continue
    next();

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
    });
  }
};
