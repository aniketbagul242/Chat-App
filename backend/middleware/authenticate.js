import jwt from "jsonwebtoken";
import userModel from "../models/user.js";


const authMiddle = async (req,res,next)=>{
  try {
   
   const {token} = req.headers; 
  
    if(!token){
       return res.json({success:false, message:"not authorized"})
    }
    const decoded = jwt.verify(token,process.env.JWT_TOKEN);
  

    if(!decoded){
       return res.json({success:false, message:"Invalid Token"})
    }
    const user = await userModel.findById(decoded.id).select({password:0})
    if(!user){
      return res.json({success:false, message:"No user found"})
    }
    req.user= user
    next()
  } catch (error) {
    console.log("error",error);
   return res.json({success:false, message:"error in authMiddle"})
    
  }
}

export default authMiddle;