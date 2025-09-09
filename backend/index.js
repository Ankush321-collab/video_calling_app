import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser  from 'cookie-parser'
import userrouters from './routes/user.route.js'

dotenv.config()
const port=process.env.PORT

const app=express()
app.use(express.json())

// routres
app.use("/api",userrouters)

app.get("/",(req,res)=>{
    res.send("backens is running by ankush")
})

mongoose.connect(process.env.MONGO_URL,{
    
})
.then(()=>{
    console.log("mongoDb connected:Video_App")
})
.catch((err)=>{
    console.log("Error:",err);
})

app.listen(port,()=>{
    console.log("Backend is running on port:5000")
})