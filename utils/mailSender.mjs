import nodemailer from 'nodemailer'
import inLineCss from 'nodemailer-juice';
import { AppError } from './AppError.mjs';
import dotenv from "dotenv";
import { renderFile } from 'ejs';
import { templatesdir } from './templates/templatesCombined.mjs';
dotenv.config();


export const MailSender = class MailSender{
    constructor(host,port,secure,user,pass){
        this.user=user
        this.transporter = nodemailer.createTransport({
            host: host,
            port: port,
            secure: secure, // true for 465, false for other ports
            auth: {
              user: user,
              pass: pass
            },
          });
          
    }
    async sendHTMLMail(to,subject,html,fromAlias=''){
      try{
      // send mail with defined transport object
      let from=this.user;
      if (fromAlias){
        from= `${fromAlias} <${this.user}>`
      }
      let 
        info = await this.transporter.sendMail({
        from, // sender address
        to,
        subject,
        html, // html body
      });
      this.transporter.use('compile', inLineCss());
      console.log("Message sent: %s", info.messageId);
  }catch(err){
      console.log("somthing went wrong "+ err.message);
      throw new AppError('500',err.message)
  }
  }
    async send(email,subject,templateFileName,params={url:String},fromAlias){
      await this.sendHTMLMail(email,subject,await renderFile(`${templatesdir}/${templateFileName}.ejs`,params),fromAlias)
    }
    async sendResetPassword(email,templateFileName,params,fromAlias){
      await this.send(email,'Reset Password','resetPasswordNew',params,fromAlias)
    }
}

/* export const Email=class Email{
  constructor(user,url)
  {
    this.to=user.Email
    this.firstName=user.firstName
    this.url=url
    this.from=process.env.APP_EMAIL
  }
  createTransport(){
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user:  process.env.APP_EMAIL,
        pass:  process.env.APP_PASSWORD
      },
    });
  }

}
*/
export const emailer = new MailSender(
  process.env.SMTP_HOST,
  process.env.SMTP_PORT,
  false,
  process.env.APP_EMAIL,
  process.env.APP_PASSWORD
);
/* */