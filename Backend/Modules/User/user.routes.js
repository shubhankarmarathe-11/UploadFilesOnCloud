import express from "express";
import {
  GetUserProfile,
  DeleteAccountController,
  UpdateDetails,
} from "./user.controller.js";

import { AccessTokenMiddleware } from "../../Middlewares/AccessTokenMiddleware.js";

const userRoute = express.Router();

userRoute.get("/user/getprofile", GetUserProfile);

userRoute.patch("/user/updateprofile", AccessTokenMiddleware, UpdateDetails);

userRoute.delete("/user/deleteprofile", DeleteAccountController);

export { userRoute };
