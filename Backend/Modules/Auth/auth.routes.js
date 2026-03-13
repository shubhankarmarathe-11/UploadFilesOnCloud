import express from "express";
import {
  LoginMiddleware,
  SignupMiddleware,
  GoogleMiddleware,
} from "./auth.middleware.js";
import {
  LoginController,
  SignupController,
  GoogleController,
} from "./auth.controller.js";
import { RedisCli } from "../../RedisConnection.js";

const authRoute = express.Router();

authRoute.post("/auth/login", LoginMiddleware, LoginController);

authRoute.post("/auth/signup", SignupMiddleware, SignupController);

authRoute.post("/auth/googleauth", GoogleMiddleware, GoogleController);

authRoute.post("/auth/update", async (req, res) => {
  //
});

authRoute.post("/auth/resetpassword", async (req, res) => {
  // otp sent on gmail for verification
});

authRoute.post("/auth/logout", async (req, res) => {
  try {
    const refreshToken = await req.cookies.host_auth_refresh;

    let Result = await RedisCli.get(`${refreshToken}`);

    await RedisCli.del(`${refreshToken}`);
    await RedisCli.del(`${Result._id}_FilesData`);

    res.clearCookie("host_auth_access");
    res.clearCookie("host_auth_refresh");

    res.status(201).send("success");
  } catch (error) {
    console.log(error);
    res.status(400).send("please try again");
  }
});

export { authRoute };
