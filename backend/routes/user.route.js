import express from 'express'
import { login, logout, onboard, signup } from '../controller/user.controller.js'
import { protecteroute } from '../middleware/uth.middleware.js'
const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

router.post("/onboard",protecteroute,onboard)

router.get("/me", protecteroute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;