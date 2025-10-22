import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userrouters from './routes/user.route.js'
import chatrouter from './routes/Chat.route.js'

import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

// load .env before using process.env
dotenv.config()

const port = process.env.PORT || 5000
const app = express()
// Behind proxies (Render/Heroku) to ensure secure cookies work
app.set('trust proxy', 1)

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
  console.log("[Upload] File uploaded to Cloudinary:", req.file?.path)
  res.json({ url: req.file.path }) // cloudinary URL
})

// Middlewares
// CORS: allow multiple origins via FRONTEND_URLS (comma-separated) or single FRONTEND_URL
const rawOrigins = (process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "http://localhost:5173").split(",")
  .map(s => s.trim())
  .filter(Boolean)

// Always include localhost for local dev
const defaultLocal = ["http://localhost:5173", "http://127.0.0.1:5173"]
const allowedOrigins = Array.from(new Set([...rawOrigins, ...defaultLocal])).map(o => o.replace(/\/$/, ""))

console.log("CORS allowed origins:", allowedOrigins)

app.use(cors({
  origin: function (origin, callback) {
    // allow non-browser requests (like Postman) with no origin
    if (!origin) return callback(null, true)
    const normalized = origin.replace(/\/$/, "")
    if (allowedOrigins.includes(normalized)) return callback(null, true)
    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// User routes
app.use("/api", userrouters)

// chat route
app.use("/api",chatrouter)

app.get("/", (req, res) => {
  res.send("backend is running by ankush")
})

// Health check endpoint with basic diagnostics (safe values only)
app.get("/api/health", (req, res) => {
  const mongooseState = mongoose.connection.readyState
  const dbStatus = mongooseState === 1 ? "connected" : mongooseState === 2 ? "connecting" : "disconnected"
  console.log("[Health] status check:", { dbStatus })
  res.json({
    status: "ok",
    env: process.env.NODE_ENV,
    db: dbStatus,
    corsAllowedOrigins: allowedOrigins,
    time: new Date().toISOString(),
  })
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
