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
exports.signupController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const AppError_1 = require("../../domain/errors/AppError");
const signUp_1 = require("../../use-cases/auth/signUp");
exports.signupController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("An account is been created..");
    const accountInfo = req.body;
    if (!accountInfo.email || !accountInfo.phone || !accountInfo.password)
        throw new AppError_1.AppError(`No data passed for ${!accountInfo.email ? "email" : !accountInfo.password ? "password" : "phone"} field in the request body`, 400);
    else if ((!accountInfo.lastName || !accountInfo.firstName) || accountInfo.lastName.length < 2)
        throw new AppError_1.AppError(`${!accountInfo.lastName || !accountInfo.firstName ? "No data passed for either lastName or firstName field in the request body" : "the length of lastName cannot be 1"}`, 400);
    yield (0, signUp_1.signUp)(accountInfo);
    console.log("Account creation sucessfull");
    res.status(201).json({ message: "Account created sucessfully" });
}));
