import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import dbConnect from "./dbConnect/dbConnect.js"
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { app, server } from "./socketIO/server.js";


const PORT = process.env.PORT

// middleware
app.use(express.json());
app.use(cors());

// db connection
dbConnect();


// api endpoint
app.use("/user", userRouter)
app.use("/api/message",messageRouter)


server.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
    
})

