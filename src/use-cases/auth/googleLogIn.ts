import { getAccessToken, getUserAccountFromGoogle } from "./googleSignUp";
import { logIn } from "./login";

export const googleLogin = async (authCode: string) => {
  // getting access token
  console.log("Getting access token...");
  const accessToken = await getAccessToken(authCode);
  // use access token to get user account info
  const { email } = await getUserAccountFromGoogle(accessToken!, "https://www.googleapis.com/oauth2/v3/userinfo");
  return await logIn({ email, password: null });
};
