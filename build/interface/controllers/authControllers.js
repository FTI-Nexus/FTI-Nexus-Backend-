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
exports.googleOAuthController = exports.oAuthController = exports.signupController = exports.oauth2Client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/errors/AppError");
const signUp_1 = require("../../use-cases/auth/signUp");
const googleSignUp_1 = require("../../use-cases/auth/googleSignUp");
const googleapis_1 = require("googleapis");
const redirectToGoogleAuth_1 = require("../../use-cases/auth/redirectToGoogleAuth");
exports.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENTID, process.env.CLIENTSECRET, `${process.env.BaseUrl}/api/v1/auth/google-signup`);
exports.signupController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("An account is been created..");
    const accountInfo = req.body;
    if (!accountInfo.email || !accountInfo.phone)
        throw new AppError_1.AppError(`No data passed for ${!accountInfo.email ? "email" : "phone"} field in the request body`, 400);
    else if (!accountInfo.lastName || !accountInfo.firstName || accountInfo.lastName.length < 2)
        throw new AppError_1.AppError(`${!accountInfo.lastName || !accountInfo.firstName ? "No data passed for either lastName or firstName field in the request body" : "the length of lastName cannot be 1"}`, 400);
    yield (0, signUp_1.signUp)(accountInfo);
    console.log("Account creation sucessfull");
    res.status(201).json({ message: "Account created sucessfully" });
}));
exports.oAuthController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oAuthType } = req.params;
    if (oAuthType === "google")
        (0, redirectToGoogleAuth_1.redirectToGoogleAuth)(res);
    else
        throw new AppError_1.AppError("oAuthTpe parameter must have values like google,facebook", 400);
}));
exports.googleOAuthController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, state, error } = req.query;
    if (!error || state != process.env.GoogleOAuthStateValue)
        throw new AppError_1.AppError(!error ? error : "Someone tempered with the requested data", 400);
    console.log("A User is creating an account with google..");
    console.log(`AuthCode=${code}`);
    const accountInfo = yield (0, googleSignUp_1.googleSignUp)(code);
    //  suppose to redirect to a page to collect the remaining data place the data gotten in the redirected url
    // the json response is for the mean time
    res.status(200).json({ accountInfo });
}));
