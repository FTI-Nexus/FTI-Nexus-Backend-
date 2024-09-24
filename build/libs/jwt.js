"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.jwtForLogIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const AppError_1 = require("../domain/errors/AppError");
dotenv_1.default.config();
const jwtForLogIn = (id) => {
    if (process.env.JwtSecretKey !== undefined) {
        return jsonwebtoken_1.default.sign({ userId: id }, process.env.JwtSecretKey, { expiresIn: "20d" });
    }
    else {
        console.log("env variable JwtSecretKey not defined on server");
        throw new AppError_1.AppError("Server errror", 500);
    }
};
exports.jwtForLogIn = jwtForLogIn;
const verifyToken = (token) => {
    if (process.env.JwtSecretKey !== undefined) {
        return jsonwebtoken_1.default.verify(token, process.env.JwtSecretKey);
    }
    else {
        throw new AppError_1.AppError("env variable JwtSecretKey not defined on server", 500);
    }
};
exports.verifyToken = verifyToken;
// export const jwtForSignUp = (id: string, verfCode: number): string => {
//   if (process.env.JwtSecretKey !== undefined) {
//     return jwt.sign({ userId: id, code: verfCode }, process.env.JwtSecretKey, { expiresIn: "1hr" });
//   } else {
//     console.log("env variable JwtSecretKey not defined on server");
//     throw new AppError("Server errror", 500);
//   }
// };
