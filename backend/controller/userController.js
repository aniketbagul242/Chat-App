import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

import validator from "validator";


// generating token
const CreateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN);
}


//signup
const SignUp = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;
  try {
    const exist = await userModel.findOne({ email })
    if (exist) {
      return res.json({ success: false, message: "User already exists" })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter valid email" })
    }

    if (password.length < 5) {
      return res.json({ success: false, message: "Please enter strong passward" })
    }

    if (password !== confirmPassword) {
      return res.json({ success: false, message: "Password do not match" })
    }

    const salt = await bcrypt.genSalt(1)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      fullname: fullname,
      email: email,
      password: hashPassword
    })

    const user = await newUser.save();
    const token = CreateToken(user._id)

    return res.json({ success: true, token: token, user: { fullname: user.fullname, email: user.email, _id: user._id } })


  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" })

  }

}

//login
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" })
    }

    const token = CreateToken(user._id);
    return res.json({ success: true, token: token, user: { fullname: user.fullname, email: user.email, _id: user._id } });


  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error" })

  }
}


// fetch users
const fetchUser = async (req, res) => {
  try {

    //removed login use from database
    const loggedUser = req.user
    const getUser = await userModel.find({ _id: { $ne: loggedUser }, }).select({ password: 0 })
    return res.json({ success: true, data: getUser })
  }
  catch (error) {
    console.log(error);
    return res.json({ success: false, message: "error" })

  }
}

export { SignUp, Login, fetchUser }