import mongoose from "mongoose";
import userModel from "./user.js";
import messageModel from "./message.js";

const conversationSchema = new mongoose.Schema({

    // storing sender and receiver id in members
   members:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:userModel
    }
   ],

   // storing each message id har ek message ka id store kar rahe hai
   messages:[
    {  
         type:mongoose.Schema.Types.ObjectId,
         ref:messageModel,
         default:[]
    }
   ]

},{timestamps:true})

const conversationModel = mongoose.model("conversation",conversationSchema);

export default conversationModel;

