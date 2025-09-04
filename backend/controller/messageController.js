
import conversationModel from "../models/conversation.js";
import messageModel from "../models/message.js";
import { getReceiverSocketId,io } from "../socketIO/server.js";

const sendMessage = async(req,res)=>{

   try {
      const {id:receiverId}= req.params;
      const senderId = req.user._id;
      const {message} =req.body;

      const trimmedReceiverId = receiverId.trim();
     
      const conversation = await conversationModel.findOne({
         members:{$all:[senderId,trimmedReceiverId]}
      })
      if(!conversation){
         conversation = await conversationModel.create({
            members:[senderId,trimmedReceiverId]
         })
      }
    
      const newMessage = new messageModel({
      receiverId:trimmedReceiverId,
      senderId:senderId,
      message:message

      })

      if(newMessage){
         conversation.messages.push(newMessage._id)
      }
     await Promise.all([conversation.save(), newMessage.save()]);

     // calling the funtion inside the socket server for real time chat
     const receiverScoketId = getReceiverSocketId(receiverId)
     if(receiverScoketId){
      io.to(receiverScoketId).emit("newMessage",newMessage)
     }

    return res.json({success:true, message:newMessage})
      
   } catch (error) {
      console.log(error);
    return res.json({success:false, message:"Error in sendMessage"})
      
   }
}



const getMessage = async (req,res)=>{
// getting sender and receiver id
  try {
   const senderId = req.user._id;
   const {id:chatUser}=req.params;
   const trimchatUser = chatUser.trim();

   const conversation = await conversationModel.findOne({
      members:{$all:[senderId,trimchatUser]}
   }).populate("messages")

   if(!conversation){
     return res.json({success:true,message:[]})
   }
  const message = conversation.messages;
   return res.json({success:true, message:message})

   
  } catch (error) {
   console.log(error);
    return res.json({success:false, message:"error in getmessage"})
   
  }
}

export {sendMessage, getMessage};