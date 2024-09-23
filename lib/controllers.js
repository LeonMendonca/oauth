import { User } from "./mongodb/schema.js";
import { MongooseError } from "mongoose";
import { getPayload, setToken } from "./jwt.js";
class Controllers {
  static async createNewUser(req, res, next) {
    try {
      const body = req.body;
      await User.create(body);
      res.status(201).json({
        message: "created!"
      });
    } catch (error) {
      if (error instanceof Error || error instanceof MongooseError) {
        next(error);
        return;
      }
      res.send(404).send("Something went wrong");
    }
  }
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmU5MTBkNTlkZTMxZjNiZmUzOWQzOGQiLCJuYW1lIjoibGVvbiIsImVtYWlsIjoibGVvbkBnbWFpbC5jb20iLCJpYXQiOjE3MjY1ODA4NDd9.i3qv1OfhwNpxDQyh3h4aYN_mx9AtNouD-wk9_gpaxYQ
  static async loginExistingUser(req, res, next) {
    try {
      const body = req.body;
      const user = await User.findOne({
        email: body.email
      });
      console.log(user);
      if (!user) {
        throw new Error("user not found");
      }
      if (user.password !== body.password.trim()) {
        throw new Error("invalid password");
      }
      const payload = {
        _id: user._id,
        name: user.name,
        email: user.email
      };
      const token = setToken(payload);
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({
        token: token
      });
    } catch (error) {
      if (error instanceof Error || error instanceof MongooseError) {
        next(error);
        return;
      }
      res.send(400).send("Something went wrong. Bad request");
    }
  }
  static async getUser(req, res, next) {
    try {
      if (!req.headers['authorization']) {
        throw new Error('No authorization header');
      }
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        throw new Error('Couldn\'t find auth token');
      }
      const payload = getPayload(token);
      //property check
      if ('_id' in payload) {
        const user = await User.findById(payload._id);
        res.send(user);
      } else {
        throw new Error('Unexpected type');
      }
    } catch (error) {
      if (error instanceof Error || error instanceof MongooseError) {
        next(error);
        return;
      }
      res.send(400).send("Something went wrong. Bad request");
    }
  }
}
export { Controllers };