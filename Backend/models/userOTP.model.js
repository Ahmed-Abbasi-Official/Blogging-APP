import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userOTP = new Schema({
    userId: {
        type: String,
        required: true,
    },
    otp: { type: String },
    expiresAt: { type: Date },
}, { timestamps: true });

const UserOTP = model("UserOTP", userOTP);

export default UserOTP;