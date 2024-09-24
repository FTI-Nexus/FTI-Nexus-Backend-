"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectToGoogleAuth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authControllers_1 = require("../../interface/controllers/authControllers");
const redirectToGoogleAuth = (res, authType = "signup") => {
    const scope = authType === "signup"
        ? ["profile", "email", "https://www.googleapis.com/auth/user.birthday.read", "https://www.googleapis.com/auth/user.gender.read", "https://www.googleapis.com/auth/user.phonenumbers.read"]
        : ["email"];
    res.redirect(authControllers_1.oauth2Client.generateAuthUrl({ scope, include_granted_scopes: true, state: process.env.GoogleOAuthStateValue }));
};
exports.redirectToGoogleAuth = redirectToGoogleAuth;
