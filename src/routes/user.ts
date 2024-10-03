import { Router } from "express";
import { UserController } from "../controller/User";

const route = Router()

route.get('/users', UserController.getUsers);

export default route;