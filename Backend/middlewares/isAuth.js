import {getUser} from '../service/auth.js'
export const isAuth = async (req, res,next) => {
  try {
   const token =req.cookies.uid; 
   if(!token)return res.json({message:"not authorized"})
   const user= getUser(token)
   if(!user)return res.json({message:"not authorized"})
    req.user=user
    next();
  } catch (error) {
    res.status(500).json({
      message: "Please Login",
    });
  }
};
