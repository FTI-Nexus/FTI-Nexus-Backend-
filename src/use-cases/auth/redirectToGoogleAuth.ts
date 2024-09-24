import dotenv from "dotenv"
dotenv.config()
import { Response } from "express";
import { oauth2Client } from "../../interface/controllers/authControllers";

export const redirectToGoogleAuth =  (res:Response,authType:"login"|"signup"="signup") => {
  const scope =
    authType === "signup"
      ? ["profile", "email", "https://www.googleapis.com/auth/user.birthday.read", "https://www.googleapis.com/auth/user.gender.read", "https://www.googleapis.com/auth/user.phonenumbers.read"]
      : ["email"];

  res.redirect(
    oauth2Client.generateAuthUrl({ scope, include_granted_scopes: true, state: authType === "signup" ? process.env.GoogleOAuthStateValueForSignup : process.env.GoogleOAuthStateValueForLogin })
  );
};
