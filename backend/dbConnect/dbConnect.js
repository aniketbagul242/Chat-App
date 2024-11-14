import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const URL = process.env.MONGODB_URI;

const dbConnect = async ()=>{
  
   try {
    await mongoose.connect(URL)
    console.log("Db connected");
    
   } catch (error) {
     console.log(error);
     
   }
}

export default dbConnect;