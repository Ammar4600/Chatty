import express from "express";
import http from "http";
import { Server } from "socket.io";
import UserModel from "./Models/authModel.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://chattyfrontend-lac.vercel.app",
        methods: ["GET", "POST"],
    }
});

const users = new Map(); // Store online users // Stores userId -> socketId

io.on("connection",  (socket) => {
    console.log("A user Connected", socket.id);

    // Register a user with their userId
    socket.on("registerUser", async (userId) => {
        users.set(userId , {socketID:socket.id  })
        // upload  it to db/
       await UserModel.findOneAndUpdate({ _id: userId }, { status: 'Online' }, { new: true })
        io.emit("updateOnlineStatus", { userId, status: true });
    });

    // Send message to a specific user
    socket.on("sendMessage", (message) => {
        const reciverID = message.receiver;

        if (!reciverID) {
            console.log("Receiver ID is undefined. Message not sent.");
            return;
        }

        const receiverSocketId = users.get(reciverID)?.socketID;

    

        if (receiverSocketId) {
            socket.to(receiverSocketId).emit("recievemsg", message);

            console.log(`Message sent to ${reciverID}`);
        } else {
            console.log(`User ${reciverID} is offline`);
        }
    });

    // Handle user disconnection
    socket.on("disconnect", async () => {
        console.log("A user Disconnected", socket.id);
    
        // Find the user ID associated with this socket
        let userIdToRemove = null;
        for (const [userId, userData] of users.entries()) {
            if (userData.socketID === socket.id) {
                userIdToRemove = userId;
                break;
            }
        }
    
        if (userIdToRemove) {
            const lastSeen = new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
            });
            users.delete(userIdToRemove); // Remove the user from online users
            
            io.emit("lastseen", { userId: userIdToRemove,  lastSeen });
           await UserModel.findOneAndUpdate({ _id: userIdToRemove }, { status:`Last seen at ${lastSeen}`, lastSeen  }, { new: true });
          
    
            // Notify all users about the disconnection
        }
    });
    
    
});

export { server, io, app };
