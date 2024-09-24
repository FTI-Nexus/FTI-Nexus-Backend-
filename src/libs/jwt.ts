import jwt, { JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "../domain/errors/AppError";
dotenv.config();

export const jwtForLogIn = (id: string): string  => {
  if (process.env.JwtSecretKey !== undefined) {
    return jwt.sign({ userId: id }, process.env.JwtSecretKey, { expiresIn: "20d" });
  } else {
    console.log("env variable JwtSecretKey not defined on server");
    throw new AppError("Server errror",500);
  }
};



export const verifyToken = (token: string): JwtPayload | null | string | any => {
 if (process.env.JwtSecretKey !== undefined) {
   return jwt.verify(token, process.env.JwtSecretKey);
 } else {
   throw new AppError("env variable JwtSecretKey not defined on server", 500);
 }
};


// export const jwtForSignUp = (id: string, verfCode: number): string => {
//   if (process.env.JwtSecretKey !== undefined) {
//     return jwt.sign({ userId: id, code: verfCode }, process.env.JwtSecretKey, { expiresIn: "1hr" });
//   } else {
//     console.log("env variable JwtSecretKey not defined on server");
//     throw new AppError("Server errror", 500);
//   }
// };
