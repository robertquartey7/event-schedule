import { Router } from "express";
import { Auth } from "../controller/Auth";
import { AuthMiddleware } from "../middleware/auth";
import { PasswordController } from "../controller/Password";


const route = Router();



route.post('/login', Auth.login);
route.post('/register', AuthMiddleware.userExist, Auth.register);
route.get('/reset_password_token/:email', AuthMiddleware.isUserExist, Auth.forgotPassword)
route.post('/reset_password', Auth.resetPassword);


export default route;