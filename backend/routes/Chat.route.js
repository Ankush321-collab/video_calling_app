import express from 'express'
import { protecteroute } from '../middleware/uth.middleware.js'
import { getstreamtoken } from '../controller/chat.controller.js'

const router=express.Router()
router.get("/token",protecteroute,getstreamtoken)


export default router;



