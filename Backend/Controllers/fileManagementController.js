import { AccessTokenMiddleware } from "../Middlewares/AccessTokenMiddleware.js";
import { RedisCli } from "../RedisConnection.js";
import { VerifyToken } from "../utils/TokenOperations.js";

import path from "path";

// Source - https://stackoverflow.com/a/50052194
// Posted by GOTO 0, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-12, License - CC BY-SA 4.0

const __dirname = import.meta.dirname;

async function FilePreviewController(req, res) {
  try {
    const RToken = req.cookies.host_auth_refresh;

    console.log("working");

    let r = await VerifyToken(String(RToken));

    if (r.payload.type != "refresh" || r == undefined) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(401).json({ message: "Invalid token" });
    }

    let result = JSON.parse(await RedisCli.get(r.payload.userId));

    const filePath = path.join(
      __dirname,
      `../uploads/${result._id}`,
      req.params.filename,
    );

    res.sendFile(filePath);
  } catch (error) {
    return res.status(401).json({ message: "please try again" });
  }
}

async function FileDownloadController(req, res) {
  try {
    const RToken = req.cookies.host_auth_refresh;

    let r = await VerifyToken(String(RToken));

    if (r.payload.type != "refresh" || r == undefined) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(401).json({ message: "Invalid token" });
    }

    let result = JSON.parse(await RedisCli.get(r.payload.userId));

    const filePath = path.join(
      __dirname,
      `../uploads/${result._id}`,
      req.params.filename,
    );

    res.download(filePath, req.params.filename);
  } catch (error) {
    return res.status(401).json({ message: "please try again" });
  }
}

export { FilePreviewController, FileDownloadController };
