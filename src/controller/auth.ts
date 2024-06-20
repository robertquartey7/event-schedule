import dotenv from "dotenv";
dotenv.config();
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { z } from "zod";
import { loginRequestValidate } from "../libs/requestValidation";
import { sendEmail } from "../libs/email";
/* Sign up new users */

export const register = async (req: Request, res: Response) => {
  try {
    const userData: z.infer<typeof loginRequestValidate> = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);

    const user = AppDataSource.manager.create(
      User,
      loginRequestValidate.parse({ ...userData, password: hashPassword })
    );

    if (user) {
      /* SENDING AN EMAIL WITH THE VERIFICATION LINK */
      const verificationLink = `${process.env.FRONTEND_URL}/verify`;
      const emailText = `
      <p>Hello,</p>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationLink}" >Verify</a>
      <p>If you didn't request this verification, please ignore this email.</p>
    `;
      sendEmail({
        emailText,
        subject: "Email Verification",
        userEmail: user.email!,
      });

      delete user.password;
      return res.status(201).json({
        success: true,
        data: user,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

/* logging in a user */
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({
//       email: email,
//     });

//     if (user) {
//       /* COMPARE PASSWORD */
//       const comparedPassword = bcrypt.compareSync(password, user.password);
//       if (comparedPassword) {
//         const token = jwt.sign(
//           {
//             id: user._id,
//             email: user.email,
//           },
//           process.env.SECRET_KEY
//         );

//         res.status(200).json({
//           accessToken: token,
//           id: user._id,
//         });
//       } else {
//         res.status().json({
//           message: "wrong password!!!",
//         });
//       }
//     } else {
//       res.status(404).json({
//         message: "User not found",
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({
//       message: "something went wrong",
//     });
//   }
// };

/*  */
