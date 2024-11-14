import express from "express";
import authMiddle from "../middleware/authenticate.js";
import { getMessage, sendMessage } from "../controller/messageController.js";

const messageRouter = express.Router();
messageRouter.post("/send/:id",authMiddle,sendMessage);
messageRouter.get("/get/:id",authMiddle,getMessage);



export default messageRouter;