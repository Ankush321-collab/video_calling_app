import express from 'express'
import { login, logout, onboard, signup } from '../controller/user.controller.js'
import { protecteroute } from '../middleware/uth.middleware.js'
import { acceptfriendrequest, getfriendrequest, getmyfriends, getOutgoingFriendReqs, getrecommend, rejectfriendrequest, sendfriendrequest } from '../controller/getpeople.controller.js'
import User from '../model/user.model.js'
const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

router.post("/onboard",protecteroute,onboard)

router.get("/recommendfriend",protecteroute,getrecommend);
router.get("/myfriends",protecteroute,getmyfriends);
router.post("/sendfriendrequest/:id",protecteroute,sendfriendrequest)
router.put("/acceptrequest/:id",protecteroute,acceptfriendrequest)
router.delete("/rejectrequest/:id",protecteroute,rejectfriendrequest)
router.get("/friendrequest",protecteroute,getfriendrequest)
router.get("/friendrequestout",protecteroute,getOutgoingFriendReqs)

router.get("/me", protecteroute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

router.get("/user/:id", protecteroute, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
});

export default router;