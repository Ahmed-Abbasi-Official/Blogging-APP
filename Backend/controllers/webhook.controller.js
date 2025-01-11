import userModel from "../models/user.model.js";
// import { sendEmail } from "../middlewares/nodemailer.js";
import dotenv from "dotenv";
import { getUser } from "../service/auth.js";
import bcrypt from "bcrypt";
import { sendVerificationCode } from "../middlewares/email.js";
import UserOTP from "../models/userOTP.model.js";
import { sendEmail } from "../service/sendMail.js";
dotenv.config();

//  FOR SIGNUP

export const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if a user with the given email already exists
    const existingUser = await userModel.findOne({ email });
    const existingUserName = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (existingUserName) {
      console.log(existingUserName);

      return res.status(400).json({ message: "username already registered" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // console.log(hashedPassword);

    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // console.log(user);
    await user.save();
    await sendEmail({ _id: user._id, email: user.email }, res);

    // return res.json({user, message: "Register successful" });
  } catch (error) {
    res.json({ error: error.message });
    console.log(error);
  }
};

//  FOR SIGN

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    // console.log(user);
    //   setUser({ id: user._id, email: user.email,name:user.username },res);
    //  res.cookie('UUID',"Good")

    return res.json({
      message: "Login successful",
      token: await user.generateToken(),
    });
  } catch (error) {
    res.json({ error: error.message });
    console.log("Error ==== >>> ", error.message);
  }
};

//  FOR UPDATEUSSER

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

    const user = await userModel.findByIdAndUpdate(userID.userId, updatedData, {
      new: true,
    });

    if (!user) return res.status(400).json({ error: "Invalid Credentials" });

    return res.json({ message: "Update successfully", user });
  } catch (error) {
    res.json({ error: error.message });
    console.log("error====>>>", error.message);
  }
};

// FOR VERIFICATION

export const verifyEmail = async (req, res) => {
  try {
    const { otp, userId } = req.body;
    // console.log(otp,userId)

    if (!userId || !otp) {
      throw Error("Empty otp details are not allowed");
    } else {
      const verificationResponse = await UserOTP.find({
        userId,
      });
      if (verificationResponse.length <= 0) {
        throw Error(
          "Account record does'nt exit or has been verified already. Please log in."
        );
      } else {
        const { expiresAt } = verificationResponse[0];

        const hashedOTP = verificationResponse[0].otp;

        if (expiresAt < Date.now()) {
          await UserOTP.deleteMany({ userId });

          throw new Error("Code has expired. Please request again.");
        } else {
          const isOTPMatched = bcrypt.compare(otp, hashedOTP);
          if (!isOTPMatched) {
            throw new Error("Invalid OTP. Please try again.");
          } else {
            const updatedUser = await userModel.findByIdAndUpdate(
              userId,
              { isVerified: true },
              { new: true }
            );
            await UserOTP.deleteMany({ userId });

            res.status(200).json({
              _id: updatedUser._id,
              username: updatedUser.username,
              email: updatedUser.email,
              role: updatedUser.role,
              userImg: updatedUser.img,
              title: updatedUser.title,
              isVerified: updatedUser.isVerified,
          });
          }
        }
      }
    }
    // const { code } = req.body;
    // const user = await userModel.findOne({ verificationCode: code });
    // if (!user)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Invalid or expired Code" });
    // user.isVerified = true;
    // user.verificationCode = undefined;
    // await user.save();
    // return res
    //   .status(200)
    //   .json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    console.log("Error in verifyOTP controller", error.message);
        res.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
};

//  RESEND OTP

export const resendOTP = async (req, res) => {
  try {
    const {  userId, email } = req.body;
    console.log("Resend Email",email);
    

    if (!userId || !email) {
        throw Error("Empty user details are not allowed");
    } else {
        await UserOTP.deleteMany({ userId });

        await sendEmail({ _id: userId, email }, res);
    }
} catch (error) {
    console.log("Error in resendOTP controller", error.message);
    res.status(500).json({
        status: "FAILED",
        message: error.message
    })
}
};
