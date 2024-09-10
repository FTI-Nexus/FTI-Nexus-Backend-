import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserAcccount } from "../../domain/auth/userAccount";
import { AppError } from "../../domain/errors/AppError";
import { signUp } from "../../use-cases/auth/signUp";

export const signupController = asyncHandler(async (req: Request, res: Response) => {
  console.log("An account is been created..");
  const accountInfo: UserAcccount = req.body;
  if (!accountInfo.email || !accountInfo.phone || !accountInfo.password)
    throw new AppError(`No data passed for ${!accountInfo.email ? "email" : !accountInfo.password ? "password" : "phone"} field in the request body`, 400);
  else if ((!accountInfo.lastName || !accountInfo.firstName) || accountInfo.lastName.length < 2)
    throw new AppError(`${!accountInfo.lastName || !accountInfo.firstName ? "No data passed for either lastName or firstName field in the request body" : "the length of lastName cannot be 1"}`, 400);
  await signUp(accountInfo);
  console.log("Account creation sucessfull");
  res.status(201).json({ message: "Account created sucessfully" });
});
