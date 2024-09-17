import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken"
import type { Tpayload } from "./types";

const secretKey = "12345";

function setToken(payload: Tpayload): string {
  const token = jwt.sign(payload, secretKey);
  return token;
}

function getPayload(token: string): JwtPayload | string {
  const payload = jwt.verify(token, secretKey); 
  return payload;
}

export { setToken, getPayload };
