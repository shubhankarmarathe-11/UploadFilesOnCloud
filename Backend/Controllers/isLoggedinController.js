import { VerifyToken } from "../utils/TokenOperations.js";
import { RedisCli } from "../RedisConnection.js";

async function isLoggedin(req, res) {
  try {
    const refreshToken = req.cookies.host_auth_refresh;
    console.log(refreshToken);

    if (!refreshToken) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(409).send("token expired");
    }

    let result = await VerifyToken(String(refreshToken));
    console.log(result.payload);

    if (result.payload == undefined) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(409).send("token expired");
    }

    let r = await RedisCli.get(String(result.payload.userId));

    if (r == null) {
      res.clearCookie("host_auth_access");
      res.clearCookie("host_auth_refresh");
      return res.status(409).send("token expired");
    }

    return res.status(200).send("is logged in");
  } catch (error) {
    return res.status(401).json({ message: "please try again" });
  }
}

export { isLoggedin };
