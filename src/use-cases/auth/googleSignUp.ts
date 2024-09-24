import axios from "axios";
import { AppError } from "../../domain/errors/AppError";
import { oauth2Client } from "../../interface/controllers/authControllers";

export const getAccessToken = async (authCode: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(authCode);
    console.log("Access token recieved");
    return tokens.access_token;
  } catch (error) {
    throw new AppError("Something went wrong try again in a few minutes", 400);
  }
};

export const getUserAccountFromGoogle = async (accessToken: string,url:string|null=null) => {
  console.log("Getting user accountInfo");
  const accountInfo = await axios({
    method: "get",
    url: url ? url : "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos,genders,birthdays,phoneNumbers",
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
  const dateOfBirth = birthdays
    ? `${birthdays[0].date.year}-${(birthdays[0].date.month as string).length === 1 ? `0${birthdays[0].date.month}` : birthdays[0].date.month}-${
        (birthdays[0].date.day as string).length === 1 ? `0${birthdays[0].date.day}` : birthdays[0].date.day
      }`
    : null;
  return { firstName:(names)? names[0].givenName:null, lastName: (names)?names[0].familyName:null, email:(emailAddresses)? emailAddresses[0].value:null, profile:(photos)? photos[0].url:null, phone:(phoneNumbers)? phoneNumbers[0].value:null, gender:(genders)? genders[0].value:null, dateOfBirth };
};
