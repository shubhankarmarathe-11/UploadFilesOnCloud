import express from "express";
import { RTokenController } from "../Controllers/RefreshTokenController.js";
import { isLoggedin } from "../Controllers/isLoggedinController.js";

const GlobalRoute = express.Router();

GlobalRoute.get("/global/refresh", RTokenController);

GlobalRoute.get("/global/isLoggedin", isLoggedin);

export { GlobalRoute };
