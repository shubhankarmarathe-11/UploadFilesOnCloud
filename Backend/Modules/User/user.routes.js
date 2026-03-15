import express from "express";
import { GetUserProfile, DeleteAccountController } from "./user.controller.js";

const userRoute = express.Router();

userRoute.get("/user/getprofile", GetUserProfile);

userRoute.delete("/user/deleteprofile", DeleteAccountController);

export { userRoute };
