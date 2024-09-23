import { Router } from "express";
import type { Request, Response, NextFunction  } from "express";
import { OAuth } from "../middleware/oauth";
import { exceptionHandler } from "../middleware/error";
import { User } from "../mongodb/schema";
import type { IUser } from "../types";
import mongoose from "mongoose";
import { getPayload } from "../jwt";

const oauth = Router();

oauth.get('/oauth', OAuth, async function(req: Request, res: Response, next: NextFunction) {
  try {
    let user : { _id: mongoose.Types.ObjectId } & IUser | null = null;
    const authorizationHeader: string | undefined = req.headers['authorization']?.split(' ')[1];
    if(!authorizationHeader) {
      throw new Error("Not a valid header");
    }
    const payload = getPayload(authorizationHeader);
    if('type' in payload && payload.type === 'tpermission') {
      user = await User.findOne({ email: payload.user.trim() });
    }
    if(!user) {
      throw new Error("No user found");
    }
    res.status(200).json({ email: user.email, name: user.name }); 
  } catch (error) {
    if(error instanceof Error) {
      next(error);
      return;
    }
    res.status(400).send('Something went wrong');
  }
  
});

oauth.use(exceptionHandler);

export { oauth };
