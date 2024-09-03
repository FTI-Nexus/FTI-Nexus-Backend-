
export interface UserAcccount {
  accountType: "trader" | "investor";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  citizenshipStatus: string;
  mediumOfCommu: "email" | "phone";
  verfCode: number;
  isAccountVerified: boolean;
  isIdentityVerified: boolean;
  profile: string;
}

export interface UserAccountRepository {
  createAccount(accountInfo: UserAcccount): Promise<void>;
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


