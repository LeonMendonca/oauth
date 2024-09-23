import { Router } from "express";
import { OAuth } from "../middleware/oauth.js";
import { exceptionHandler } from "../middleware/error.js";
import { User } from "../mongodb/schema.js";
import { getPayload } from "../jwt.js";
const oauth = Router();
oauth.get('/oauth', OAuth, async function (req, res, next) {
  try {
    let user = null;
    const authorizationHeader = req.headers['authorization']?.split(' ')[1];
    if (!authorizationHeader) {
      throw new Error("Not a valid header");
    }
    const payload = getPayload(authorizationHeader);
    if ('type' in payload && payload.type === 'tpermission') {
      user = await User.findOne({
        email: payload.user.trim()
      });
    }
    if (!user) {
      throw new Error("No user found");
    }
    res.status(200).json({
      email: user.email,
      name: user.name
    });
  } catch (error) {
    if (error instanceof Error) {
      next(error);
      return;
    }
    res.status(400).send('Something went wrong');
  }
});
oauth.use(exceptionHandler);
export { oauth };