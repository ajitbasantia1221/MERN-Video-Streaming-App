import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import commentRoutes from "./routes/comments.js";
import videoRoutes from "./routes/videos.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

//Connecting the server to MongoDb
const connect = () =>{
    mongoose.connect(process.env.MONGO).then(() =>{
        console.log("Connected To MONGO DB!!")
    }).catch((err)=>{
        throw err;
    });
};

//Middlewares
app.use(cookieParser());
app.use(express.json());  // 
app.use("/api/users",userRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/auth",authRoutes);


//Error Handling using express server middleware 
app.use((err,req,res,next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong Abruptly";
    return res.status(status).json({
        success: false,
        status,
        message
    })

})

//Server listening to the port and connecting the server
app.listen(8080, ()=>{
    connect();
    console.log("Connected to Server!!");
})