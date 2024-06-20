import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import appConfig from "../config/app";
import { MailOptionInterface } from "../interface";

const transporterConfig: SMTPTransport.Options = {
  host: appConfig.environment.dev.SMTP_SERVER,
  port: appConfig.environment.dev.SMTP_PORT,
  secure: false,

  auth: {
    user: appConfig.environment.dev.SMTP_EMAIL,
    pass: appConfig.environment.dev.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

export const transporter = nodemailer.createTransport(transporterConfig);

export const mailOptions = (options: MailOptionInterface) => {
  return {
    from: "robertquartey7@gmail.com",
    to: options.userEmail,
    subject: options.subject,
    html: options.emailText,
  };
};
