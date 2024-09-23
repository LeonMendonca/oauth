import { Router } from "express";
import { Controllers } from "../controllers.js";
import { exceptionHandler } from "../middleware/error.js";
const userRoute = Router();
userRoute.post('/signup', Controllers.createNewUser);
userRoute.post('/login', Controllers.loginExistingUser);
userRoute.use(exceptionHandler);
export { userRoute };