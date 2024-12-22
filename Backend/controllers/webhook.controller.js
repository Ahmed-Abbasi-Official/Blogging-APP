import userModel from "../models/user.model.js";
import { Webhook } from "svix";
import 'dotenv/config'

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  console.log(WEBHOOK_SECRET);
  

  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: "Webhook verification failed!",
    });
  }

console.log("EVT ========================>",evt);



  if (evt.type === 'user.created') {
    console.log("EVT>TYPE============>>>>>>>>>>>",evt.type);
    const  payload= {
      clerkUserId: evt?.data.id || "clerkUserId",
      username: evt?.data.username || evt?.data.email_addresses[0]?.email_address || "username",
      fullName: evt?.data.first_name + " " + evt?.data.last_name || "fullname",
      email: evt?.data.email_addresses[0]?.email_address || "email",
    }
    console.log(payload);
    
    
    try {
      const user = await userModel.create(payload);
      console.log("USER CREATED ================ >>>>>>>>", user);
  } catch (err) {
      console.error("Error saving user to MongoDB: ", err);
  }
  console.log("USER ================ >>>>>>>>", user);
  

  }
  return res.status(200).json({
    message: "Webhook received",
  });
};