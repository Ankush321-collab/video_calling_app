import express from 'express'
import { login, logout, onboard, signup } from '../controller/user.controller.js'
import { protecteroute } from '../middleware/uth.middleware.js'
import { acceptfriendrequest, getmyfriends, getrecommend, sendfriendrequest } from '../controller/getpeople.controller.js'
const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

router.post("/onboard",protecteroute,onboard)

router.get("/recommendfriend",protecteroute,getrecommend);
router.get("/myfriends",protecteroute,getmyfriends);
router.post("/sendfriendrequest/:id",protecteroute,sendfriendrequest)
router.put("/acceptrequest/:id",protecteroute,acceptfriendrequest)

router.get("/me", protecteroute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;