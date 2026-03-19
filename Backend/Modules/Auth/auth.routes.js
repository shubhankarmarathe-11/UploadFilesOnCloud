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
  LogoutController,
} from "./auth.controller.js";

const authRoute = express.Router();

authRoute.post("/auth/login", LoginMiddleware, LoginController);

authRoute.post("/auth/signup", SignupMiddleware, SignupController);

authRoute.post("/auth/googleauth", GoogleMiddleware, GoogleController);

authRoute.get("/auth/logout", LogoutController);

export { authRoute };
