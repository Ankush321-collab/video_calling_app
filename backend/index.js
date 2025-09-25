import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userrouters from './routes/user.route.js'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// load .env before using process.env
dotenv.config()

const port = process.env.PORT || 5000
const app = express()

// Cloudinary config (check values are loaded)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

console.log("Cloudinary check:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ loaded" : "❌ missing",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ loaded" : "❌ missing"
})

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "video_app",
    allowed_formats: ["jpg", "png", "jpeg", "mp4"]
  }
})
const upload = multer({ storage })

// Upload route
app.post("/api/upload", upload.single("profile"), (req, res) => {
  res.json({ url: req.file.path }) // cloudinary URL
})

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// User routes
app.use("/api", userrouters)

app.get("/", (req, res) => {
  res.send("backend is running by ankush")
})

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected: Video_App")
  })
  .catch((err) => {
    console.error("MongoDB Error:", err)
  })

// Start server
app.listen(port, () => {
  console.log(`Backend is running on port: ${port}`)
})
