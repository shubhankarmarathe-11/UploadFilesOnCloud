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
import { VerifyToken } from "../../utils/TokenOperations.js";

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

    let result = await VerifyToken(String(refreshToken));

    let Result = await RedisCli.get(`${result.payload.userId}`);

    await RedisCli.del(`${Result}`);
    await RedisCli.del(`${Result}_FilesData`);

    res.clearCookie("host_auth_access");
    res.clearCookie("host_auth_refresh");

    res.status(201).send("success");
  } catch (error) {
    console.log(error);
    res.status(400).send("please try again");
  }
});

export { authRoute };
