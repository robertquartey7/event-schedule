
import { mailOptions, transporter } from "../config/email";
import { MailOptionInterface } from "../interface";

export async function sendEmail(
  options: MailOptionInterface
) {
  return transporter.sendMail(mailOptions(options), (err, success) => {
    if (err) {
      console.log(err.message);
    }
  });
}

