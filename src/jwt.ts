import jwt from "jsonwebtoken";
import type { Tpayload, Tpermission } from "./types";

const secretKey = "12345";

function setToken(payload: Tpayload | Tpermission): string {
  const token = jwt.sign(payload, secretKey);
  return token;
}

type TPayload = Tpayload | Tpermission;

function getPayload(token: string): TPayload {
  const payload = jwt.verify(token, secretKey); 
  return payload as TPayload;
}

export { setToken, getPayload };
