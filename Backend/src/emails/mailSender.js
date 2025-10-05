import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { createWelcomeEmailTemplate } from './emailTemplates.js';

dotenv.config();


// Step 1: Create a transporter
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.NODEMAILERUSER, // your email
    pass: process.env.NODEMAILERPASS  // your email password or app password
  }
});


// Step 2: Configure the email options

// Step 3: Send the email


export const sendWelcomeEmail = async (email, name, clientURL) => {
let mailOptions = {
  from: process.env.NODEMAILERUSER, // sender address
  to: email,
  subject: "Welcome to Chatify!",
  html: createWelcomeEmailTemplate(name, clientURL),
};


  transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error while sending mail:', error);
  }
  console.log('Email sent successfully:', info.response);
  console.log('welcome email sent to:', email);
});

};