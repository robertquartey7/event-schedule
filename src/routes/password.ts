import { Router } from "express";
import { PasswordController } from "src/controller/Password";



const route = Router();


route.get('/reset_password',);
route.delete('/reset_passwords', PasswordController.deleteAll);
