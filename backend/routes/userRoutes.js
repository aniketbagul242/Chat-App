import express from "express"
import {SignUp, Login ,fetchUser} from "../controller/userController.js";
import authMiddle from "../middleware/authenticate.js";

const userRouter =express.Router();
userRouter.post("/signup", SignUp)
userRouter.post("/login",Login);
userRouter.get("/userdata", authMiddle,fetchUser)

export default userRouter;