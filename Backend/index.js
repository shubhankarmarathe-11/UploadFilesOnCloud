import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { RedisCli } from "./RedisConnection.js";

import { authRoute } from "./Modules/Auth/auth.routes.js";
import { GlobalRoute } from "./Routes/GlobalRoute.js";
import { userRoute } from "./Modules/User/user.routes.js";
import { FileRoute } from "./Modules/Files/file.route.js";

dotenv.config();

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const ConnectDB = async () => {
  try {
    // await mongoose.connect(`${process.env.MongoUri}`);
    await mongoose.connect(`${process.env.MongoUri}`, clientOptions);

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (error) {
    console.log(error);
  } //finally {
  //   // Ensures that the client will close when you finish/error
  //   await mongoose.disconnect();
  // }
};

ConnectDB();

const App = express();
const port = 3000 || process.env.Port;

App.use(bodyParser.json());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: "*",
  }),
);
App.use(cookieParser());

App.get("/", (req, res) => {
  res.status(200).send("working");
});

// Routes
App.use("/api", GlobalRoute);
App.use("/api", authRoute);
App.use("/api", userRoute);
App.use("/api", FileRoute);

App.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
