import { UserAcccount, UserAccountRepository } from "../../domain/auth/userAccount";
import { UserAccountSchema } from "../database/userAccountSchema";

export class UserAccountRepositoryImp implements UserAccountRepository {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async createAccount(accountInfo:UserAcccount): Promise<void>{
    await UserAccountSchema.create(accountInfo)
  }
  async updateEmail(newEmail: string): Promise<void> {
    await UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { email: newEmail } });
  }
  async updatePhone(newPhone: string): Promise<void> {
    await UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { phone: newPhone } });
  }
  async updatePassword(newPassword: string): Promise<void> {
    await UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { password: newPassword } });
  }
  async updateUsername(newUsername: string): Promise<void> {
    await UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { username: newUsername } });
  }
  async updateMediumOfCommunication(newMedium: "email" | "phone"): Promise<void> {
    await UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { mediumOfCommu: newMedium } });
  }
  async updateVerfCode(newVerfCode: number): Promise<void> {
    await UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { verfCode: newVerfCode } });
  }
  async updateIsAccountVerified(isVerified: boolean): Promise<void> {
    await UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { isAccountVerified: isVerified } });
  }
  async updateIsIdentityVerified(isVerified: boolean): Promise<void> {
    await UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { isIdentityVerified: isVerified } });
  }
  async updateProfile(newProfile: string): Promise<void> {
    await UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { profile: newProfile } });
  }
}
