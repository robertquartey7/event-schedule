import { Router } from "express";
import { Auth } from "../controller/Auth";
import { AuthMiddleware } from "../middleware/auth";
import { Password } from "../controller/Password";


const route = Router();



route.post('/login', Auth.login);
route.post('/register', AuthMiddleware.userExist, Auth.register);
route.get('/reset_password_token', AuthMiddleware.isUserExist, Password.resetPasswordToken)
// route.post('/reset_password', Password.resetPassword );

export default route;