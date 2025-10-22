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
// Robust CORS setup: supports FRONTEND_URLS (comma-separated) and normalizes trailing slashes
const clean = (url) => (url || "").replace(/\/$/, "");
const envOriginsRaw = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "";
const envOrigins = envOriginsRaw
  .split(",")
  .map((s) => clean(s.trim()))
  .filter(Boolean);

const defaults = [
  clean("http://localhost:5173"),
  clean("http://127.0.0.1:5173"),
  clean("http://localhost:3000"),
];

const allowedOrigins = Array.from(new Set([...envOrigins, ...defaults])).filter(Boolean);

console.log("CORS allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (like curl/postman with no origin)
      if (!origin) return callback(null, true);
      const normalized = clean(origin);
      if (allowedOrigins.includes(normalized)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: Origin not allowed -> ${origin}`), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 204,
  })
)
app.use(express.json())
app.use(cookieParser())

// User routes
app.use("/api", userrouters)

// chat route
app.use("/api",chatrouter)

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
