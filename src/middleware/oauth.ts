import type { Request, Response, NextFunction  } from "express";
import { User } from "../mongodb/schema";
import mongoose from 'mongoose';
import { setToken } from "../jwt";
import { getPayload } from "../jwt";

import type { IUser } from "../types";
import type { Tpermission } from "../types";

const cacheUser = new Map<string, boolean>();

async function OAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader: string | undefined = req.headers['authorization']?.split(' ')[1];
    if(authorizationHeader) {
      const perPayload = getPayload(authorizationHeader);
      if('type' in perPayload && perPayload.type === 'tpermission') {
        next();
        return;
      } else {
        throw new Error('Not a valid payload');
      }
    }
    const email: unknown = req.body.email;
    if(typeof email === 'string') {
      if(!cacheUser.get(email)) {
        console.log('queried!');
        const user = await User.findOne({ email: email.trim() });
        if(!user) {
          throw new Error('No user found');
        }
        cacheUser.set(email, true);
      }
      if(!req.query.allow) {
        res.status(200).json({ 
          message: 'This service can have access to email, name. Is it ok?',
          confirm: '?allow=true'
        });
        return;
      } else {
        const query = req.query;
        let isAllow: boolean = false;
        if(typeof query.allow === 'string') {
          isAllow = (query.allow.trim() === 'true') ? true : false;
        }
        if(!isAllow) {
          res.send("permission denied!");
          return;
        }
        const accessTokenPayload: Tpermission = {
          type: 'tpermission',
          user: email,
          email: true,
          name: true
        }
        const accessToken = setToken(accessTokenPayload);
        res.set({
          "Content-Type": "text/plain",
          "Content-Length": Buffer.byteLength(accessToken, 'utf8')
        });
        res.status(201).send(accessToken);
      }
    } else {
      throw new Error(`Unexpected type; Expected string, got ${typeof email}`);
    }
  } catch (error) {
    if(error instanceof Error) {
      next(error); 
      return;
    }
    res.status(400).send('Something went wrong');
  }
}

export { OAuth };
