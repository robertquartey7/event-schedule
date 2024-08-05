import { Router } from "express";
import { Auth } from "../controller/Auth";


const route = Router()
const auth = new Auth;

route.get('/login');
route.post('/register', auth.register);

export default route;