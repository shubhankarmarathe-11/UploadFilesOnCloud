import { RedisCli } from "../../RedisConnection.js";
import { UserDetail } from "./user.model.js";
import { VerifyToken } from "../../utils/TokenOperations.js";

async function GetUserProfile(req, res) {
  try {
    const refreshToken = await req.cookies.host_auth_refresh;
    let Result = await RedisCli.get(String(refreshToken));

    if (Result == null) {
      let token = await VerifyToken(refreshToken);
      if (token.payload == undefined) {
        return res.status(409).send("Token expired");
      }
      let FindUser = await UserDetail.findById(token.payload.userId, {
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

export { GetUserProfile };
