import Application, { json } from "express";
import registerRoute from "./routes/register.js";
import loginRouter from "./routes/login.js";
import jobRoute from "./routes/jobs.js";

import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import process from "node:process";
import cors from "cors";

const app = Application();
const port = 3000;
configDotenv();

mongoose
  .connect(
    `${process.env.DBURI}`
  )
  .then(() => {
    console.log("DB Connection successfully!");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
app.use(cors());
app.use(json());
app.use("/api/user/register", registerRoute);
app.use("/api/user/login", loginRouter);
app.use("/api/jobs", jobRoute);

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to Job Portal API services." });
});

app.listen(port, () => {
  console.log(`Server running! at http://localhost:${port}`);
});
