import type { Request, Response, NextFunction  } from "express";
import { User } from "./mongodb/schema";
import type { IUser, Tlogin, Tpayload, TSignup } from "./types";
import { MongooseError } from "mongoose";
import { setToken } from "./jwt";

class Controllers {
  static async createNewUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body: TSignup = req.body;
      await User.create<TSignup>(body);
      res.status(201).json({ message: "created!" });
    } catch (error) {
      if(error instanceof Error || error instanceof MongooseError) {
        next(error);
        return;
      }
      res.send(404).send("Something went wrong");
    }
  }
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmU5MTBkNTlkZTMxZjNiZmUzOWQzOGQiLCJuYW1lIjoibGVvbiIsImVtYWlsIjoibGVvbkBnbWFpbC5jb20iLCJpYXQiOjE3MjY1ODA4NDd9.i3qv1OfhwNpxDQyh3h4aYN_mx9AtNouD-wk9_gpaxYQ
  static async loginExistingUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body: Tlogin = req.body;
      const user = await User.findOne({ email: body.email });
      console.log(user);
      if(!user) {
        throw new Error("user not found");
      }
      if(user.password !== body.password.trim()) {
        throw new Error("invalid password");
      }
      const payload: Tpayload = {
        _id: user._id,
        name: user.name,
        email: user.email
      }
      const token = setToken(payload);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ 
        token: token
      });
    } catch (error) {
      if(error instanceof Error || error instanceof MongooseError) {
        next(error);
        return;
      }
      res.send(400).send("Something went wrong. Bad request");
    }
  }
}

export { Controllers };
