import { Router } from "express";
import { Controllers } from "../controllers.js";
import { exceptionHandler } from "../middleware/error.js";
const userGet = Router();
userGet.get('/user', Controllers.getUser);
userGet.use(exceptionHandler);
export { userGet };