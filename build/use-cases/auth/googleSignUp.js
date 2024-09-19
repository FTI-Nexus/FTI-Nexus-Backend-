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
exports.googleSignUp = void 0;
const axios_1 = __importDefault(require("axios"));
const AppError_1 = require("../../domain/errors/AppError");
const authControllers_1 = require("../../interface/controllers/authControllers");
const getAccessToken = (authCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tokens } = yield authControllers_1.oauth2Client.getToken(authCode);
        return tokens.access_token;
    }
    catch (error) {
        throw new AppError_1.AppError("Something went wrong try again in a few minutes", 400);
    }
});
const getUserAccountFromGoogle = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    const accountInfo = (yield (0, axios_1.default)({ method: "get", url: "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos,genders,birthdays,phoneNumbers", headers: { Authorization: `Bearer ${accessToken}` } })).data;
    return accountInfo;
});
const googleSignUp = (authCode) => __awaiter(void 0, void 0, void 0, function* () {
    // getting access token
    const accessToken = yield getAccessToken(authCode);
    console.log(accessToken);
    // use access token to get user account info
    return yield getUserAccountFromGoogle(accessToken);
});
exports.googleSignUp = googleSignUp;
