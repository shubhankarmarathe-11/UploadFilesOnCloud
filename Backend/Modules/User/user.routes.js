import express from "express";
import { GetUserProfile } from "./user.controller.js";

const userRoute = express.Router();

userRoute.get("/user/getprofile", GetUserProfile);

export { userRoute };
