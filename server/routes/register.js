import { Router } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import process from "node:process";
import User from "../model/user.js";

const registerRoute = Router();

registerRoute.post("/", async (req, res) => {
  const data = req.body;
  const { error } = validateUser(data);
  if (error) {
    res.status(400).send({ msg: error });
    return;
  }

  const _user = await User.findOne({ email: data.email });
  if (_user) {
    res.status(400).send({ msg: "User already exit!" });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(data.passwd, salt);

  const user = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    passwd: hash,
  });

  const savedUser = await user.save();

  const jwtoken = Jwt.sign(
    { _id: savedUser._id, email: data.email },
    process.env.JWTPRIVATE
  );
  res
    //.header("x-auth-token", jwtoken)
    .send({ token: jwtoken, msg: "User registration successfully!" });
});

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    passwd: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")),
  });
  return schema.validate(user);
}

export default registerRoute;
