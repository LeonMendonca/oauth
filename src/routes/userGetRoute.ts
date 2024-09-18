import { Router } from "express";
import { Controllers } from "../controllers";
import { exceptionHandler } from "../middleware/error";

const userGet = Router();

userGet.get('/user', Controllers.getUser);

userGet.use(exceptionHandler);

export { userGet };
