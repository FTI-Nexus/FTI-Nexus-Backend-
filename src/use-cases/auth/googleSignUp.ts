import axios from "axios";
import { AppError } from "../../domain/errors/AppError";
import { oauth2Client } from "../../interface/controllers/authControllers";

const getAccessToken = async (authCode: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(authCode);
    console.log("Access token recieved");
    return tokens.access_token;
  } catch (error) {
    throw new AppError("Something went wrong try again in a few minutes", 400);
  }
};

const getUserAccountFromGoogle = async (accessToken: string) => {
  console.log("Getting user accountInfo");
  const accountInfo = await axios({
    method: "get",
    url: "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos,genders,birthdays,phoneNumbers",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  console.log(`Request status=${accountInfo.status}`);
  return accountInfo.data;
};

export const googleSignUp = async (authCode: string) => {
  // getting access token
  console.log("Getting access token...");
  const accessToken = await getAccessToken(authCode);

  // use access token to get user account info
  const { names, emailAddresses, photos, phoneNumbers, birthdays, genders } = await getUserAccountFromGoogle(accessToken!);
  console.log(`names=${names[0]}`)  
  const dateOfBirth = ""
  return { firstName: names[0].givenName, lastName: names[0].familyName, email: emailAddresses[0].value, profile: photos[0].url, phone: phoneNumbers[0].value, gender: genders[0].value, dateOfBirth };
};
