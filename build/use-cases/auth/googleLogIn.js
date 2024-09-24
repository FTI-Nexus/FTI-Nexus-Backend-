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
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = void 0;
const googleSignUp_1 = require("./googleSignUp");
const login_1 = require("./login");
const googleLogin = (authCode) => __awaiter(void 0, void 0, void 0, function* () {
    // getting access token
    console.log("Getting access token...");
    const accessToken = yield (0, googleSignUp_1.getAccessToken)(authCode);
    // use access token to get user account info
    const { email } = yield (0, googleSignUp_1.getUserAccountFromGoogle)(accessToken, "https://www.googleapis.com/oauth2/v3/userinfo");
    return yield (0, login_1.logIn)({ email, password: null });
});
exports.googleLogin = googleLogin;
