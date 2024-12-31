import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use any email service here
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

// Function to send email
export const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // Recipient address
    subject,
    text, // Plain text body
    html, // HTML body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
