import {Schema} from 'mongoose'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const userSchema=new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  fullName:{
    type:String,
  }
  ,
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    default:null
  },
  userImg:{
    type:String,
    default:'/images/User.png'
  },
  savedPosts:{
    type:[String],
    default:[],
  },
  role:{
    type:String,
    default:"user"
  }

},{timestamps:true})

userSchema.methods.generateToken=async function () {
  try {
    return jwt.sign( {
userId:this._id,
email:this.email,
role:this.role,
username:this.username
    },process.env.JWT_SECRET_KEY)
  } catch (error) {
    console.log(error);
    
  }
}

const userModel=mongoose.model('User',userSchema);

export default userModel;






























// import mongoose, { Schema } from "mongoose";
// import { createHmac, randomBytes } from "crypto";
// import { error } from "console";

// const userSchema = new Schema(
//   {
//     fullname: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     salt: {
//       type: String,
//     },
//     ProfileImageURL: {
//       type: String,
//       default: "/images/default.png",
//     },
//     role: {
//       type: String,
//       enum: ["USER", "ADMIN"],
//       default: "USER",
//     },
//   },
//   { timestamps: true }
// );


// userSchema.pre("save", function (next) {
//   const user = this;
//   if (!user.isModified("password")) return;
//   const salt = randomBytes(16).toString();
//   const hashPassword = createHmac("sha256", salt)
//     .update(user.password)
//     .digest("hex");

//     this.salt=salt;
//     this.password=hashPassword
//   console.log(hashPassword);
//   next();
// });

// userSchema.static('matchPassword',async function (email,password){
//   const user=await this.findOne({email})
//   if(!user) throw new Error("User not Found!!");
//   const salt =user.salt;
//   const hashPassword=user.password;

//   const userProviderHashPassword=createHmac('sha256',salt).update(password).digest('hex')
//   if(hashPassword !== userProviderHashPassword) throw new Error("Incorect Password !!");
//   return {...user,password:null,salt:null}

// } )

// const USER = mongoose.model("USER", userSchema);

// export default USER;
