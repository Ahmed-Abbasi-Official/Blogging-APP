import userModel from "../models/user.model.js";
// import { sendEmail } from "../middlewares/nodemailer.js"; 
import dotenv from 'dotenv';

dotenv.config();

export const signUp =async(req,res)=>{
  try {
    const user= new userModel(req.body);
    console.log(user);
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
    if(!user) return res.status(400).json({error: "Invalid Credentials"})
    // console.log(user);
    //   setUser({ id: user._id, email: user.email,name:user.username },res);
    //  res.cookie('UUID',"Good")

    
   return res.json({message:"Login successful",token:await user.generateToken()})
    
  } catch (error) {
    res.json({error: error.message});
    console.log(error);
    
  }
}
export const userUpdate =async(req,res)=>{
  try {
    const {email,password} = req.body
    const user=await userModel.findOne({email,password});
    if(!user) return res.status(400).json({error: "Invalid Credentials"})
    // console.log(user);
    //   setUser({ id: user._id, email: user.email,name:user.username },res);
    //  res.cookie('UUID',"Good")

    
   return res.json({message:"Login successful",token:await user.generateToken()})
    
  } catch (error) {
    res.json({error: error.message});
    console.log(error);
    
  }
}