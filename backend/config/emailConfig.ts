const nodemailer = require("nodemailer");
import dotenv from 'dotenv'
dotenv.config()

const sendEmail = async (option) =>{
  const transporter =await nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 20000,
});

const emailOptions = {
  from: 'nodemail <ram@gmail.com>',
  to:option.email,
  subject:option.subject,
  text:option.message
}

await transporter.sendMail(emailOptions)
}

export default sendEmail

