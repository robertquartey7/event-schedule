import { Request, Response, Router } from "express";
import { register } from "../controller/auth";


const route = Router()

route.get('/login');
route.post('/register', register);



export default route;