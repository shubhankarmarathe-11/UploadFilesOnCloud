import express from "express";
import { RTokenController } from "../Controllers/RefreshTokenController.js";
import { isLoggedin } from "../Controllers/isLoggedinController.js";
import { AccessTokenMiddleware } from "../Middlewares/AccessTokenMiddleware.js";
import {
  FileDownloadController,
  FilePreviewController,
} from "../Controllers/fileManagementController.js";
import { RedisCli } from "../RedisConnection.js";

import path from "path";

// Source - https://stackoverflow.com/a/50052194
// Posted by GOTO 0, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-12, License - CC BY-SA 4.0

const __dirname = import.meta.dirname;

const GlobalRoute = express.Router();

GlobalRoute.get("/global/refresh", RTokenController);

GlobalRoute.get("/global/isLoggedin", isLoggedin);

GlobalRoute.get(
  "/global/file/:filename",
  AccessTokenMiddleware,
  FilePreviewController,
);

GlobalRoute.get(
  "/global/deletefile/:filename",
  AccessTokenMiddleware,
  FileDownloadController,
);

export { GlobalRoute };
