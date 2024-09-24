import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { UserAcccount } from "../../domain/auth/userAccount";
import { AppError } from "../../domain/errors/AppError";
import { UserAccountRepositoryImp } from "../../infrastructure/repository/userAccountRepository";
import { encryptPassword } from "../../libs/bcrypt";

// helper methods
function getRandomCharacters(str: string, numChars: number = 2): string {
  // Convert the string into an array of characters
  const characters = str.split("");
  const selectedCharacters: string[] = [];

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
function getRandomThreeDigitNumber(): number {
  // Generate a random number between 100 and 999 inclusive
  const min = 100;
  const max = 999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateUserName = async (firstName: string, lastName: string, accontRepo: UserAccountRepositoryImp) => {
  let userName = `${getRandomCharacters(lastName)}${firstName}${getRandomThreeDigitNumber()}`;

  while (await accontRepo.findAccountByUsername(userName)) {
    userName = `${getRandomCharacters(lastName)}${firstName}${getRandomThreeDigitNumber()}`;
  }

  return userName;
};

const checkAccountExistence = (account: UserAcccount | null) => {
  if (account) {
    console.log("Account already exist");
    if (!account.isAccountVerified) throw new AppError("Account already exist,acoount verification required", 409);
    else if (!account.isIdentityVerified) throw new AppError("Account already exist,KYC required", 409);
    throw new AppError("Account already exist", 409);
  }
};

export const signUp = async (accountInfo: UserAcccount) => {
  console.log("Use Case:SignUp executed");
  const userAccountRepo = new UserAccountRepositoryImp(null);
  // check if account already exists using email and phone number
  console.log("Checking if account already exist...");
  let account = await userAccountRepo.findAccountByEmail(accountInfo.email);
  checkAccountExistence(account);
  account = await userAccountRepo.findAccountByPhone(accountInfo.phone);
  checkAccountExistence(account);

  //  generating username for account
  console.log("Generating username...");
  accountInfo.username = await generateUserName(accountInfo.firstName, accountInfo.lastName, userAccountRepo);
  console.log("Username generated");

  if (accountInfo.password) {
    console.log("Encrypting password..");
    accountInfo.password = await encryptPassword(accountInfo.password);
    console.log("Password encrypted");
  }
  await userAccountRepo.createAccount(accountInfo);
};
