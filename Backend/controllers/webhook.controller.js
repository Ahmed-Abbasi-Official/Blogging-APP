import userModel from "../models/user.model.js";
// import { sendEmail } from "../middlewares/nodemailer.js"; 
import dotenv from 'dotenv';
import { getUser } from "../service/auth.js";
import { request } from "express";

dotenv.config();

export const signUp =async(req,res)=>{
  try {
    const { email, username, password} = req.body;

    // Check if a user with the given email already exists
    const existingUser = await userModel.findOne({ email });
    const existingUserName = await userModel.findOne({ username });
    if (existingUser) {
      
      return res.status(400).json({ message: 'Email already registered' });

    }
    if (existingUserName) {
      console.log(existingUserName);
      
      
      return res.status(400).json({ message: 'username already registered' });

    }
    const user= new userModel(req.body);
    // console.log(user);
    await user.save();
    return res.json({message:"Register successful"})
  } catch (error) {
    res.json({error: error.message});
    console.log(error);
    
  }
}
export const signIn =async(req,res)=>{
  try {
    const {email,password} = req.body
    const user=await userModel.findOne({email,password});
    if(!user) return res.status(400).json({error: "User not found"})
    // console.log(user);
    //   setUser({ id: user._id, email: user.email,name:user.username },res);
    //  res.cookie('UUID',"Good")

    
   return res.json({message:"Login successful",token:await user.generateToken()})
    
  } catch (error) {
    res.json({error: error.message});
    console.log("Error ==== >>> " , error.message);
    
  }
}


export const userUpdate = async (req, res) => {
  try {
    const clerkUserId = req?.headers?.authorization;

    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }

    const userID = getUser(clerkUserId);

    const currentUser = await userModel.findById(userID.userId);
    if (!currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    console.log(req.body.userImg);
    const updatedData = {
      
      username: req.body.username || currentUser.username,
      userImg: req.body.userImg || currentUser.userImg,
      fullName: req.body.fullname || currentUser.fullName || "Anonymous",
    };

    const user = await userModel.findByIdAndUpdate(userID.userId, updatedData, { new: true });
    
    if (!user) return res.status(400).json({ error: "Invalid Credentials" });

    return res.json({ message: "Update successfully", user });
  } catch (error) {
    res.json({ error: error.message });
    console.log("error====>>>", error.message);
  }
};
