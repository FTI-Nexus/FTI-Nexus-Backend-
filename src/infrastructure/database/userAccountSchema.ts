import mongoose from "mongoose";
import { UserAcccount } from "../../domain/auth/userAccount";

// Database structure for documents in UserAccounts Collection
const userAccountSchema = new mongoose.Schema<UserAcccount>({
  accountType: {
    type: String,
    enum: ["trader", "investor"],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: "N/A",
  },
  username: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  citizenshipStatus: {
    type: String,
    required: true,
  },
  mediumOfCommu: {
    type: String,
    default: "email", // either email or phone
  },
  verfCode: {
    type: Number,
    default: 0,
  },
  isAccountVerified: {
    type: Boolean,
    default: false,
  },
  isIdentityVerified: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: String,
    default: "/defaultProfile.png",
  },
});

export const UserAccountSchema = mongoose.model("UserAcccount", userAccountSchema);