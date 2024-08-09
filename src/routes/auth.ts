import { Router } from "express";
import { Auth } from "../controller/Auth";
import { userExist } from "../middleware/auth";


const route = Router()
const auth = new Auth;

route.get('/login');
route.post('/register', userExist, auth.register);

export default route;