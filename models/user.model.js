import mongoose, { Schema } from "mongoose";
import { createHmac, randomBytes } from "crypto";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    ProfileImageURL: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);


userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;
  const secret = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", secret)
    .update(user.password)
    .digest("hex");

    this.salt=salt;
    this.password=hashPassword
  console.log(hashPassword);
  next();
});

const USER = mongoose.model("USER", userSchema);

export default USER;
