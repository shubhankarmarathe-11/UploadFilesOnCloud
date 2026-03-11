import { RedisCli } from "../../RedisConnection.js";

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

export { LoginMiddleware, SignupMiddleware };
