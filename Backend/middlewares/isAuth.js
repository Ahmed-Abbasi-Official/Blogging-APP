import userModel from "../models/user.model.js";

export const isAuth = async (req, res,next) => {
  try {
    const clerkUserId = req.auth.userId;
    console.log(clerkUserId);
    
    if (!clerkUserId) {
      res.status(401).json("Not Authenticated");
    }
    const user = await userModel.findOne({ clerkUserId });
    console.log(user);
    
    if (!user) {
      res.status(401).json("Please Login");
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Please Login",
    });
  }
};
