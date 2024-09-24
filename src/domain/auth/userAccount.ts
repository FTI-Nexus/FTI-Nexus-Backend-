import { Types } from "mongoose";

export interface UserAcccount {
  _id:Types.ObjectId;
  accountType: "trader" | "investor";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  username: string;
  dateOfBirth: string;
  gender: "male"|"female"|"trans";
  countryOfOrigin: string;
  mediumOfCommu: "email" | "phone";
  verfCode: number;
  isAccountVerified: boolean;
  isIdentityVerified: boolean;
  profile: string;
}


export interface UserAccountRepository {
  createAccount(accountInfo: UserAcccount): Promise<void>;
  findAccountByEmail(phone: string): Promise<UserAcccount | null>;
  findAccountByPhone(phone: string): Promise<UserAcccount | null>;
  findAccountByUsername(username: string): Promise<boolean>;
  updateEmail(newEmail: string): Promise<void>;
  updatePhone(newPhone: string): Promise<void>;
  updatePassword(newPassword: string): Promise<void>;
  updateUsername(newUsername: string): Promise<void>;
  updateMediumOfCommunication(newMedium: "email" | "phone"): Promise<void>;
  updateVerfCode(newVerfCode: number): Promise<void>;
  updateIsAccountVerified(isVerified: boolean): Promise<void>;
  updateIsIdentityVerified(isVerified: boolean): Promise<void>;
  updateProfile(newProfile: string): Promise<void>;
}


