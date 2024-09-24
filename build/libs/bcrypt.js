"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.encryptPassword = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("../domain/errors/AppError");
const encryptPassword = (rawPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(rawPassword, Number(process.env.PasswordEncrptRounds));
});
exports.encryptPassword = encryptPassword;
const verifyPassword = (rawPassword, encryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordCorrect = yield bcrypt_1.default.compare(rawPassword, encryptedPassword);
    if (!isPasswordCorrect)
        throw new AppError_1.AppError("Invalid email and password", 401);
});
exports.verifyPassword = verifyPassword;
