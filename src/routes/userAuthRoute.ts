import { Router } from "express";
import { Controllers } from "../controllers";
import { exceptionHandler } from "../middleware/error";

const userRoute = Router();

userRoute.post('/signup', Controllers.createNewUser);

userRoute.post('/login', Controllers.loginExistingUser);

userRoute.use(exceptionHandler);

export { userRoute };
