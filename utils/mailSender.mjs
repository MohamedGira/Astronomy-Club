import nodemailer from 'nodemailer'
import inLineCss from 'nodemailer-juice';
import { AppError } from './AppError.mjs';
import dotenv from "dotenv";
dotenv.config();


export const MailSender = class MailSender{
    constructor(host,port,secure,user,pass){
        this.transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: secure, // true for 465, false for other ports
            auth: {
              user: user,
              pass: pass
            },
          });
          
          this.sendTextMail=async (to,subject,text)=>{
            try{
            // send mail with defined transport object
            let info = await this.transporter.sendMail({
              from: this.user, // sender address
              to: to,
              subject: subject,
              text: text, // plain text body
            });
            console.log("Message sent: %s", info.messageId);
        }catch(err){
            console.log("somthing went wrong "+ err.message);
            throw new AppError('500',err.message)
        }
        }
        this.sendHTMLMail=async (to,subject,htmlbody)=>{
            try{
            // send mail with defined transport object
            this.transporter.use('compile', inLineCss());
            let info = await this.transporter.sendMail({
              from: this.user, // sender address
              to: to,
              subject: subject,
              html: htmlbody, // html body
            });
            console.log("Message sent: %s", info.messageId);
        }catch(err){
            console.log("somthing went wrong "+ err.message);
            throw new AppError('500',err.message)
        }
        }
   
    }
}

export const emailer = new MailSender(
  process.env.SMTP_HOST,
  process.env.SMTP_PORT,
  false,
  process.env.APP_EMAIL,
  process.env.APP_PASSWORD
);
/* */