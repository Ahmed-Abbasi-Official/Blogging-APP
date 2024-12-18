import {Schema} from 'mongoose'
import mongoose from 'mongoose'

const userSchema=new Schema({
  clerkUserId:{
    type:String,
    required:true,
    unique:true,
  },
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    unique:true,
  },
  userImg:{
    type:String
  },
  savedPosts:{
    type:[String],
    default:[],
  }
},{timestamps:true})

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
