import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const users = {};

// helper function to get receiver socket id
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

// used to listen events on server side
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // getting userId from frontend
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Current users:", users);
  }

  // notify all clients about online users
  io.emit("getOnlineUser", Object.keys(users));

  // ==============================
  // 📌 1. Typing indicators
  // ==============================
  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", { senderId });
    }
  });

  socket.on("stopTyping", ({ senderId, receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping", { senderId });
    }
  });

  // ==============================
  // 📌 2. Instant notifications (new message)
  // ==============================
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    // here you can also save the message to DB before emitting
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        senderId,
        text,
      });
    }
  });

  // ==============================
  // 📌 Disconnect
  // ==============================
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    if (userId) {
      delete users[userId];
      io.emit("getOnlineUser", Object.keys(users));
    }
  });
});

export { io, app, server };
