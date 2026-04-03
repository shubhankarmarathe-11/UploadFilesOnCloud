import { RedisCli } from "../../RedisConnection.js";
import { validateGoogleToken } from "../../utils/Validate0AuthToken.js";
import { FindUserWithEmail } from "../User/user.services.js";
import { SignToken } from "../../utils/TokenOperations.js";
import dotenv from "dotenv";

dotenv.config();

const bytesToMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

async function LoginMiddleware(req, res, next) {
  try {
    let { email, password } = req.body;

    const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(String(email)))
      return res.status(406).send("please enter proper email");

    if (!passwordRegex.test(String(password)))
      return res
        .status(406)
        .send(
          "password must contain alphabets and numbers and length must be grater than 8",
        );

    next();
  } catch (error) {
    console.log(error);

    return res.status(400).send("please try again");
  }
}

async function SignupMiddleware(req, res, next) {
  try {
    let { email, mob, password } = req.body;

    const passwordRegex = /^[a-zA-Z0-9]{8,}$/;
    const mobRegex = /^[0-9]{10,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(String(email)))
      return res.status(406).send("please enter proper email");

    if (!mobRegex.test(String(mob)))
      return res
        .status(406)
        .send(
          "please enter proper number or enter password without country code and zero",
        );

    if (!passwordRegex.test(String(password)))
      return res
        .status(406)
        .send(
          "password must contain alphabets and numbers and length must be grater than 8",
        );

    next();
  } catch (error) {
    console.log(error);

    return res.status(400).send("please try again");
  }
}

const GoogleMiddleware = async (req, res, next) => {
  try {
    let { google_token } = req.body;
    const isProduction = process.env.NODE_ENV === "production";

    let r = await validateGoogleToken(google_token);

    if (r == false) return res.status(401).send("invalid token");

    const payload = r.getPayload();
    const { email } = payload;

    let fetch = await FindUserWithEmail({ Email: String(email) });

    req.payload = payload;

    if (fetch == null) return res.status(400).send("please try again");
    if (fetch == 404) return next();

    let { Atoken, Rtoken } = await SignToken(String(fetch._id));

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
      `${fetch._id}`,
      JSON.stringify({
        _id: fetch._id,
        name: fetch.Name,
        email: fetch.Email,
        mob: fetch.Number,
        profileimg: fetch.ProfileUrl,
        storage_used: await bytesToMB(fetch.storage_used_bytes),
        storage_remain: await bytesToMB(fetch.Storagelimit_bytes),
      }),
    );

    res.status(201).send("login successfully");
  } catch (error) {
    console.log(error);

    return res.status(400).send("please try again");
  }
};

export { LoginMiddleware, SignupMiddleware, GoogleMiddleware };
