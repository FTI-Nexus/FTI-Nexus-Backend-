import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import { UserAcccount } from "../../domain/auth/userAccount";
import {getName} from "country-list"

// Database structure for documents in UserAccounts Collection
const userAccountSchema = new mongoose.Schema<UserAcccount>({
  accountType: {
    type: String,
    enum: { values: ["trader", "investor"], message: `{VALUE} is not a valid value for accountType.Valid values= trader investor` },
    required: [true, "No data passed for accountType"],
  },
  firstName: {
    type: String,
    required: [true, "No data passed for firtName"],
    match: [/^[a-zA-Z-]+$/, "firstName value invalid. firstName must be a string and must not contain space"],
  },
  lastName: {
    type: String,
    minlength: [2, "lastName must be at least 2 characters"],
    required: [true, "No data passed for lastName"],
    match: [/^(?!.*[ -]{2})[a-zA-Z]+(?:[ -][a-zA-Z]+)*$/, "lastName value invalid. lastName must be a string and must not cotain leading or trailing spaces"],
  },
  email: {
    type: String,
    required: [true, "No data passed for email"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email value is invalid. email must be in the form username@domain.com and must not contain any space"],
  },
  phone: {
    type: String,
    required: [true, "No data passed for phone"],
    match: [/^\+?\d{1,3}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, "phone value is invalid."],
  },
  password: {
    type: String,
    default: "N/A",
  },
  username: {
    type: String,
    required: [true, "No data passed for username"],
  },
  dateOfBirth: {
    type: String,
    required: [true, "No data passed for dateOfBirth"],
    match: [/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, "dateOfBirth value invalid. dateOfBirth must be in this form yyyy-mm-dd"],
  },
  gender: {
    type: String,
    enum: { values: ["male", "female", "trans"], message: `{VALUE} is not a valid value for gender for this system.Valid values= male female tans` },
    required: [true, "No data passed for gender"],
  },
  countryOfOrigin: {
    type: String,
    required: [true, "No data passed for countryOfOrigin"],
    match: [/^[A-Za-z]+$/, "countryOfOrigin value invalid. countryOfOrigin must be a string and must not contain any space"],
    validate: {
      validator: function (value:string) {
        return getName(value)!==undefined;
      },
      message: "Value passed of countryOfOrigin is not a country's ISO code",
    },
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
    default: `${process.env.BaseUrl}/defaultProfile.png`,
  },
});

export const UserAccountSchema = mongoose.model("UserAcccount", userAccountSchema);
