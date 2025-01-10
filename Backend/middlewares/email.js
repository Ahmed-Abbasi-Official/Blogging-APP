import { transporter } from "./emailConfig.js";
import { Verification_Email_Template } from "./emailTemplate.js";

export const sendVerificationCode=async (email,verificationCode)=>{
    try {
        // send mail with defined transport object
          const response = await transporter.sendMail({
            from: '"From Bloggify👻" <aymi.coding@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Email Verification ✔", // Subject line
            text: "Please Verified Through the Code", // plain text body
            html: Verification_Email_Template.replace("{verificationCode}",verificationCode), // html body
          });

          console.log("Email Send Succesfully : ",response)
        
    } catch (error) {
        console.log(error);
        
    }
}