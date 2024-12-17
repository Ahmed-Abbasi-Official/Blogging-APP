import userModel from "../models/user.model.js";
import { Webhook } from "svix";

class WebHook {
  async clerWebHook(req, res) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error("Webhook Secret Needed!");
    }
    const payload = req.body;
    const headers = req.headers;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
      evt = wh.verify(payload, headers);
    } catch (err) {
      res.status(400).json({
        message: "Webhook verification failed! ",
      });
    }
    console.log(evt.data);

    if (evt.type === "user.created") {
      const newUser = new userModel({
        clerkUserId: evt.data.id,
        username:
          evt.data.username || evt.data.email_addresses[0].email_addresses,
        email: evt.data.email_addresses[0].email_addresses,
        password: evt.data.password,
        userImg: evt.data.profile_img_url,
      });
      await newUser.save();
    }
    return res.status(200).json({
        message:"Webhook recived successfully"
    })
  }
}

const webhooksController = new WebHook();

export default webhooksController;
