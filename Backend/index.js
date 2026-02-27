import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { RedisCli } from "./RedisConnection.js";

dotenv.config();

const ConnectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MongoUri}`);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

ConnectDB();

const App = express();
const port = 3000 || process.env.Port;

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(
  cors({ origin: "*", methods: ["GET", "POST", "PATCH", "DELETE", "PUT"] }),
);
App.use(cookieParser());

App.get("/", (req, res) => {
  res.status(200).send("working");
});

App.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
