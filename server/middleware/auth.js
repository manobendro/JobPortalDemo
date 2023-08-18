import Jwt from "jsonwebtoken";
import process from "node:process";

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send({ msg: "Access denied. No token provided." });

  try {
    const decoded = Jwt.verify(token, process.env.JWTPRIVATE);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send({ msg: "Invalid token." });
  }
}
export default auth;
