import express from 'express'
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import Authroutes from './Routes/auth.route.js'
import MessageRoutes from './Routes/message.route.js'
import connectDB from './Config/db.js'
import cors from 'cors';
import { app, server } from './socketServer.js';



dotenv.config()


const port = process.env.PORT


app.use(cors({
    origin: "https://chattyfrontend-lac.vercel.app",
    credentials: true, // Allows cookies to be sent
}));





app.use(cookieParser()); // Enables `req.cookies`
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


 
connectDB()


app.use('/auth',  Authroutes)

app.use("/user" ,  MessageRoutes)

 


server.listen(port , ()=> console.log("Server is up on PORT:", + port))
