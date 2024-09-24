import { AppError } from "../../domain/errors/AppError";
import { UserAccountRepositoryImp } from "../../infrastructure/repository/userAccountRepository";
import { verifyPassword } from "../../libs/bcrypt";
import { jwtForLogIn } from "../../libs/jwt";

export const logIn = async (logInCredentials: { email: string; password:string|null}) => {
  const { email, password } = logInCredentials;
  const { findAccountByEmail } = new UserAccountRepositoryImp(null);
  // find account using email
  const account = await findAccountByEmail(email);

  if (!account) throw new AppError("No account with this email exist", 404);
  // compare the passwords provided
  if (password) {
    await verifyPassword(password, account.password); // this method throw an error if there is a mis-match
  }
  return jwtForLogIn(String(account._id));
};
