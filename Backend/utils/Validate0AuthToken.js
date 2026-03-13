import { OAuth2Client } from "google-auth-library";

const validateGoogleToken = async (token) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    let Token = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    return Token;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export { validateGoogleToken };
