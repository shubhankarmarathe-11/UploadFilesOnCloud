import { RedisCli } from "../../RedisConnection.js";
import { UserDetail } from "./user.model.js";
import { VerifyToken } from "../../utils/TokenOperations.js";
import { DeleteAccount } from "./user.services.js";

import fs from "fs";
import path from "path";

const __dirname = import.meta.dirname;

async function GetUserProfile(req, res) {
  try {
    const refreshToken = await req.cookies.host_auth_refresh;

    let r = await VerifyToken(String(refreshToken));

    if (r.payload.type != "refresh" || r == undefined) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(401).json({ message: "Invalid token" });
    }

    let Result = await RedisCli.get(r.payload.userId);

    if (Result == null) {
      let FindUser = await UserDetail.findById(r.payload.userId, {
        storage_used_bytes: 1,
        Storagelimit_bytes: 1,
      });
      if (FindUser == null) return res.status(406).send("user not found");

      return res.status(200).send(FindUser);
    }
    Result = JSON.parse(Result);

    res.status(200).send(Result);
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
}

async function DeleteAccountController(req, res) {
  try {
    const refreshToken = await req.cookies.host_auth_refresh;

    let r = await VerifyToken(String(refreshToken));

    if (r.payload.type != "refresh" || r == undefined) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(401).json({ message: "Invalid token" });
    }

    let Result = await RedisCli.get(r.payload.userId);

    if (Result == null) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(401).json({ message: "Invalid token" });
    }

    const filePath = path.join(__dirname, `../../uploads/${r.payload.userId}`);
    if (fs.existsSync(filePath)) {
      await fs.promises.rm(filePath, {
        recursive: true,
        force: true,
      });
    }

    await RedisCli.del(`${r.payload.userId}`);
    await RedisCli.del(`${r.payload.userId}_FilesData`);

    res.clearCookie("host_auth_access");
    res.clearCookie("host_auth_refresh");

    let Delete = await DeleteAccount({ userId: r.payload.userId });

    if (Delete == 400 || Delete == null)
      return res.status(400).send("please try again");

    res.status(200).send("Account Deleted");
  } catch (error) {
    console.log(error);

    return res.status(400).send("please try again");
  }
}

export { GetUserProfile, DeleteAccountController };
