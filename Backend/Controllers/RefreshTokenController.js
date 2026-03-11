import { SignAToken, VerifyToken } from "../utils/TokenOperations.js";
import { RedisCli } from "../RedisConnection.js";

async function RTokenController(req, res) {
  try {
    const refreshToken = await req.cookies.host_auth_refresh;
    let result = await VerifyToken(String(refreshToken));

    if (result.payload.type != "refresh" || result == undefined) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(401).json({ message: "Invalid token" });
    }

    const { Atoken } = await SignAToken(result.payload.userId);
    if (Atoken == undefined) {
      await RedisCli.del(`${refreshToken}`);
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(401).send("please try again");
    }
    res.cookie("host_auth_access", Atoken, {
      path: "/",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(201).send({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).send("please try again");
  }
}

export { RTokenController };
