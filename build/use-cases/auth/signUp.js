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
exports.signUp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const AppError_1 = require("../../domain/errors/AppError");
const userAccountRepository_1 = require("../../infrastructure/repository/userAccountRepository");
const bcrypt_1 = require("../../libs/bcrypt");
// helper methods
function getRandomCharacters(str, numChars = 2) {
    // Convert the string into an array of characters
    const characters = str.split("");
    const selectedCharacters = [];
    // Randomly select characters
    while (selectedCharacters.length < numChars) {
        // Get a random index
        const randomIndex = Math.floor(Math.random() * characters.length);
        const char = characters[randomIndex];
        // Check if the character is already selected
        if (!selectedCharacters.includes(char)) {
            selectedCharacters.push(char);
        }
    }
    return selectedCharacters.join("");
}
function getRandomThreeDigitNumber() {
    // Generate a random number between 100 and 999 inclusive
    const min = 100;
    const max = 999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const generateUserName = (firstName, lastName, accontRepo) => __awaiter(void 0, void 0, void 0, function* () {
    let userName = `${getRandomCharacters(lastName)}${firstName}${getRandomThreeDigitNumber()}`;
    while (yield accontRepo.findAccountByUsername(userName)) {
        userName = `${getRandomCharacters(lastName)}${firstName}${getRandomThreeDigitNumber()}`;
    }
    return userName;
});
const checkAccountExistence = (account) => {
    if (account) {
        console.log("Account already exist");
        if (!account.isAccountVerified)
            throw new AppError_1.AppError("Account already exist,acoount verification required", 409);
        else if (!account.isIdentityVerified)
            throw new AppError_1.AppError("Account already exist,KYC required", 409);
        throw new AppError_1.AppError("Account already exist", 409);
    }
};
const signUp = (accountInfo) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Use Case:SignUp executed");
    const userAccountRepo = new userAccountRepository_1.UserAccountRepositoryImp(null);
    // check if account already exists using email and phone number
    console.log("Checking if account already exist...");
    let account = yield userAccountRepo.findAccountByEmail(accountInfo.email);
    checkAccountExistence(account);
    account = yield userAccountRepo.findAccountByPhone(accountInfo.phone);
    checkAccountExistence(account);
    //  generating username for account
    console.log("Generating username...");
    accountInfo.username = yield generateUserName(accountInfo.firstName, accountInfo.lastName, userAccountRepo);
    console.log("Username generated");
    if (accountInfo.password) {
        console.log("Encrypting password..");
        accountInfo.password = yield (0, bcrypt_1.encryptPassword)(accountInfo.password);
        console.log("Password encrypted");
    }
    yield userAccountRepo.createAccount(accountInfo);
});
exports.signUp = signUp;
