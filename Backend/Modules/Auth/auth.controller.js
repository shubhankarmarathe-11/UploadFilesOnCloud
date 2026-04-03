import {
  CreateDocument,
  LoginUser,
  CreateUserwithGoogle,
} from "../User/user.services.js";
import { SignToken, VerifyToken } from "../../utils/TokenOperations.js";
import { RedisCli } from "../../RedisConnection.js";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Source - https://stackoverflow.com/a/50052194
// Posted by GOTO 0, modified by community. See post 'Timeline' for change history
// Retrieved 2026-03-12, License - CC BY-SA 4.0

const __dirname = import.meta.dirname;

const isProduction = process.env.NODE_ENV === "production";

const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

async function LoginController(req, res) {
  const isProduction = process.env.NODE_ENV === "production";
  try {
    let { email, password } = req.body;

    let result = await LoginUser({
      email: String(email),
      password: String(password),
    });

    if (result == 404) return res.status(404).send("Incorrect email");

    if (result == 406) return res.status(404).send("Incorrect password");

    let { Atoken, Rtoken } = await SignToken(String(result._id));

    if (Atoken == undefined || Rtoken == undefined)
      return res.status(400).send("please try again");
    res.cookie("host_auth_access", Atoken, {
      path: "/",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });
    res.cookie("host_auth_refresh", Rtoken, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });

    await RedisCli.set(
      `${result._id}`,
      JSON.stringify({
        _id: result._id,
        name: result.Name,
        email: result.Email,
        mob: result.Number,
        profileimg: result.ProfileUrl,
        storage_used: await bytesToMB(result.storage_used_bytes),
        storage_remain: await bytesToMB(result.Storagelimit_bytes),
      }),
    );

    res.status(201).send("login successfully");
  } catch (error) {
    console.log(error);

    return res.status(400).send("please try again");
  }
}

async function SignupController(req, res) {
  const isProduction = process.env.NODE_ENV === "production";
  try {
    let { name, email, mob, password } = req.body;
    const createUser = await CreateDocument({
      name: String(name),
      email: String(email),
      mob: String(mob),
      password: String(password),
    });
    if (createUser == null) return res.status(400).send("please try again");

    if (createUser == 406)
      return res.status(406).send("please use another email/number");

    await fs.mkdir(
      path.join(__dirname, "../../uploads", String(createUser._id)),
      {
        recursive: true,
      },
    );

    let { Atoken, Rtoken } = await SignToken(String(createUser._id));

    if (Atoken == undefined || Rtoken == undefined)
      return res.status(200).send("please log in back");

    res.cookie("host_auth_access", Atoken, {
      path: "/",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });
    res.cookie("host_auth_refresh", Rtoken, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });

    await RedisCli.set(
      `${createUser._id}`,
      JSON.stringify({
        _id: createUser._id,
        name: createUser.Name,
        email: createUser.Email,
        mob: createUser.Number,

        profileimg: createUser.ProfileUrl,
        storage_used: await bytesToMB(createUser.storage_used_bytes),
        storage_remain: await bytesToMB(createUser.Storagelimit_bytes),
      }),
    );

    res.status(201).send("user register successfully");
  } catch (error) {
    console.log(error);

    return res.status(400).send("please try again");
  }
}

async function GoogleController(req, res) {
  const isProduction = process.env.NODE_ENV === "production";
  console.log(isProduction);

  try {
    let { email, name, picture, sub } = req.payload;
    const createUser = await CreateUserwithGoogle({
      email: email,
      name: name,
      picture: picture,
      sub: sub,
    });
    if (createUser == null) return res.status(400).send("please try again");
    await fs.mkdir(
      path.join(__dirname, "../../uploads", String(createUser._id)),
      {
        recursive: true,
      },
    );

    let { Atoken, Rtoken } = await SignToken(String(createUser._id));

    console.log(Atoken);

    if (Atoken == undefined || Rtoken == undefined)
      return res.status(200).send("please log in back");

    res.cookie("host_auth_access", Atoken, {
      path: "/",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });
    res.cookie("host_auth_refresh", Rtoken, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction ? true : false,
      sameSite: isProduction ? "none" : "lax",
    });

    await RedisCli.set(
      `${createUser._id}`,
      JSON.stringify({
        _id: createUser._id,
        name: createUser.Name,
        email: createUser.Email,
        mob: createUser.Number,

        profileimg: createUser.ProfileUrl,
        storage_used: await bytesToMB(createUser.storage_used_bytes),
        storage_remain: await bytesToMB(createUser.Storagelimit_bytes),
      }),
    );

    res.status(201).send("user register successfully");
  } catch (error) {
    console.log(error);

    return res.status(400).send("please try again");
  }
}

async function LogoutController(req, res) {
  try {
    const refreshToken = req.cookies.host_auth_refresh;

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
}

export {
  LoginController,
  SignupController,
  GoogleController,
  LogoutController,
};
