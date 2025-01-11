import { sendVerificationCode } from "../middlewares/email.js";
import UserOTP from "../models/userOTP.model.js";
import { generateOtp } from "./generateOTP.js"
import bcrypt from "bcrypt";;

const sendEmail = async ({ _id, email}, res) => {
    try {
        const otp = generateOtp()
        console.log("email",email,"id",_id);
        

        const salt = bcrypt.genSaltSync(10);
        const hashedOTP =  bcrypt.hashSync(otp, salt);

        const newOTP = await UserOTP.create({
            userId: _id,
            otp: hashedOTP,
            expiresAt: new Date(Date.now() + 60 * 1000)
        })

        sendVerificationCode(email,otp)

        return res.status(200).json({
            status: "PENDING",
            message: "Verification email sent successfully. Please check your inbox.",
            data: {
                userId: _id,
                email: email,
            }
        });
    } catch (error) {
        res.status(404).json({
            status: "FAILED",
            message: error.message,
        })
    }
}

export { sendEmail }