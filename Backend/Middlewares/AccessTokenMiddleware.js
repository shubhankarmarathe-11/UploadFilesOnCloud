import { VerifyToken } from "../utils/TokenOperations.js";

const AccessTokenMiddleware = async (req, res, next) => {
  try {
    const accessToken = await req.cookies.host_auth_access;

    if (accessToken == undefined)
      return res.status(401).json({ message: "Invalid token 0" });

    let result = await VerifyToken(String(accessToken));

    if (result.payload.type != "access" || result == undefined)
      return res.status(401).json({ message: "Invalid token" });

    next();
  } catch (error) {
    console.log("err-", error);

    return res.status(400).send("please try again");
  }
};

export { AccessTokenMiddleware };
