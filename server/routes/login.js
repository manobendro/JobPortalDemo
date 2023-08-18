import { Router } from "express";
import Joi from "joi";
import Jwt from "jsonwebtoken";
import process from "node:process";
import User from "../model/user.js";
import bcrypt from "bcrypt";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const loginData = req.body;
  const { error } = validateLoginData(loginData);
  if (error) {
    return res.status(400).send({ msg: error.details });
  }
  const user = await User.findOne({ email: loginData.email });
  if (user) {
    if (bcrypt.compareSync(loginData.passwd, user.passwd)) {
      const jwtoken = Jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWTPRIVATE
      );
      return (
        res
          //.header("x-auth-token", jwtoken)
          .send({ token: jwtoken, msg: "Login successfully." })
      );
    }
  }
  return res.status(401).send({ msg: "Invalid username or password." });
});

function validateLoginData(loginData) {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "xyz"] },
    }),
    passwd: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return schema.validate(loginData);
}

export default loginRouter;
