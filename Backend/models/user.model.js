import {Schema} from 'mongoose'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const userSchema=new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
    default:'/User.png?updatedAt=1735717183257'
  },
  savedPosts:{
    type:[String],
    default:[],
  },
  role:{
    type:String,
    default:"user"
  },
  isVerified:{
    type:Boolean,
    default:false
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