import { SignJWT, jwtVerify } from "jose";
import dotenv from "dotenv";
import { createSecretKey } from "crypto";

dotenv.config();

let Key = process.env.JWT_SECRET;

let JWT_SECRET = createSecretKey(String(Key), "utf-8");

const SignToken = async (_id) => {
  try {
    const Atoken = await new SignJWT({ userId: _id, type: "access" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setIssuer(process.env.JWT_ISSUER)
      .setAudience(process.env.JWT_AUDIENCE)
      .sign(JWT_SECRET);

    const Rtoken = await new SignJWT({
      userId: _id,
      type: "refresh",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .setIssuer(process.env.JWT_ISSUER)
      .setAudience(process.env.JWT_AUDIENCE)
      .sign(JWT_SECRET);

    return { Atoken, Rtoken };
  } catch (error) {
    console.log("err-", error);
    let Atoken = undefined;
    let Rtoken = undefined;
    return { Atoken, Rtoken };
  }
};

const SignAToken = async (_id) => {
  try {
    const Atoken = await new SignJWT({ userId: _id, type: "access" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setIssuer(process.env.JWT_ISSUER)
      .setAudience(process.env.JWT_AUDIENCE)
      .sign(JWT_SECRET);

    return { Atoken };
  } catch (error) {
    console.log(error);
    let Atoken = undefined;

    return { Atoken };
  }
};

const VerifyToken = async (Token) => {
  try {
    let { payload } = await jwtVerify(String(Token), JWT_SECRET, {
      issuer: process.env.JWT_ISSUER, // issuer
      audience: process.env.JWT_AUDIENCE, // audience
    });

    return { payload };
  } catch (error) {
    let payload = undefined;
    return { payload };
  }
};

export { SignToken, VerifyToken, SignAToken };
