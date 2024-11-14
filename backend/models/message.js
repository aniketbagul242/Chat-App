import mongoose from "mongoose";
//import userModel from "./user.js";

const messageSchema = new mongoose.Schema({

    senderId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    }


},{timestamps:true})

const messageModel = mongoose.model("message",messageSchema);
export default messageModel;