import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

// real time messaging
export const getReceiverScoketId = (receiverId)=>{
    return users[receiverId]
}


const users = {}
// used to listen events on server side
  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    // getting userId from frontend
    const userId = socket.handshake.query.userId
    if(userId){
        users[userId]=socket.id
        console.log("Hello",users);
        
    }
   // used to send the event all to all connected users
    io.emit("getOnlineUser",Object.keys(users))

    // used to listen client side events emmited by server side
    // used in both server and client
    socket.on("disconnected", (socket) => {
        console.log("a user disconnected", socket.id);
    delete users[userId]
     io.emit("getOnlineUser",Object.keys(users))
    })

})

export{io,app,server}

