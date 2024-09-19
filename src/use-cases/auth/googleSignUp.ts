import axios from "axios";
import { AppError } from "../../domain/errors/AppError";
import { oauth2Client } from "../../interface/controllers/authControllers";

const getAccessToken = async (authCode: string) => {
try {
  const { tokens } = await oauth2Client.getToken(authCode);
  return tokens.access_token;  
} catch (error) {
    throw new AppError("Something went wrong try again in a few minutes",400)
}
};

const getUserAccountFromGoogle = async (accessToken: string) => {
  const accountInfo = (await axios({ method: "get", url: "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos,genders,birthdays,phoneNumbers", headers: { Authorization: `Bearer ${accessToken}` } })).data;
  return accountInfo;
};

export const googleSignUp = async (authCode: string) => {
  // getting access token
  const accessToken = await getAccessToken(authCode);
    console.log(accessToken)
  // use access token to get user account info
  return await getUserAccountFromGoogle(accessToken!);
};
