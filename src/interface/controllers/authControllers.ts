import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserAcccount } from "../../domain/auth/userAccount";
import { AppError } from "../../domain/errors/AppError";
import { signUp } from "../../use-cases/auth/signUp";
import { googleSignUp } from "../../use-cases/auth/googleSignUp";
import { google } from "googleapis";
import { redirectToGoogleAuth } from "../../use-cases/auth/redirectToGoogleAuth";

export const oauth2Client = new google.auth.OAuth2(process.env.CLIENTID, process.env.CLIENTSECRET, `${process.env.BaseUrl}/api/v1/auth/google-signup`);

export const signupController = asyncHandler(async (req: Request, res: Response) => {
  console.log("An account is been created..");
  const accountInfo: UserAcccount = req.body;
  if (!accountInfo.email || !accountInfo.phone) throw new AppError(`No data passed for ${!accountInfo.email ? "email" : "phone"} field in the request body`, 400);
  else if (!accountInfo.lastName || !accountInfo.firstName || accountInfo.lastName.length < 2)
    throw new AppError(`${!accountInfo.lastName || !accountInfo.firstName ? "No data passed for either lastName or firstName field in the request body" : "the length of lastName cannot be 1"}`, 400);
  await signUp(accountInfo);
  console.log("Account creation sucessfull");
  res.status(201).json({ message: "Account created sucessfully" });
});



export const oAuthController=asyncHandler(async (req: Request, res: Response) =>{
const {oAuthType}=req.params
if(oAuthType==="google")  redirectToGoogleAuth(res);
else throw new AppError("oAuthTpe parameter must have values like google,facebook",400)
})


export const googleOAuthController = asyncHandler(async (req: Request, res: Response) => {
  const { code, state, error } = req.query;
  if (!error || state != process.env.GoogleOAuthStateValue) throw new AppError(!error ? (error as string) : "Someone tempered with the requested data", 400);

  const accountInfo = await googleSignUp(code as string);
  //  suppose to redirect to a page to collect the remaining data place the data gotten in the redirected url
  // the json response is for the mean time
  res.status(200).json({ accountInfo });
});
