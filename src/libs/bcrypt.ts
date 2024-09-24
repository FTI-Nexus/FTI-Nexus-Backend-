import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { AppError } from "../domain/errors/AppError";

export const encryptPassword = async (rawPassword: string): Promise<string> => {
  return await bcrypt.hash(rawPassword, Number(process.env.PasswordEncrptRounds!));
};

export const verifyPassword = async (rawPassword: string, encryptedPassword: string) => {
  const isPasswordCorrect = await bcrypt.compare(rawPassword, encryptedPassword);
  if (!isPasswordCorrect) throw new AppError("Invalid email and password", 401);
};
