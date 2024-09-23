import jwt from "jsonwebtoken";
const secretKey = "12345";
function setToken(payload) {
  const token = jwt.sign(payload, secretKey);
  return token;
}
function getPayload(token) {
  const payload = jwt.verify(token, secretKey);
  return payload;
}
export { setToken, getPayload };