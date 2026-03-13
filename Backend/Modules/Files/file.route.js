import express from "express";
import multer from "multer";
import { RedisCli } from "../../RedisConnection.js";

import { AccessTokenMiddleware } from "../../Middlewares/AccessTokenMiddleware.js";
import {
  FileUploadController,
  FetchFilesController,
  DeleteFileController,
} from "./file.controller.js";

const FileRoute = express.Router();

FileRoute.post("/file/uploadfile", AccessTokenMiddleware, FileUploadController);
FileRoute.get("/file/fetchfiles", AccessTokenMiddleware, FetchFilesController);
FileRoute.delete(
  "/file/deletefiles/:fileid/:filename/:filesize",
  AccessTokenMiddleware,
  DeleteFileController,
);

export { FileRoute };
