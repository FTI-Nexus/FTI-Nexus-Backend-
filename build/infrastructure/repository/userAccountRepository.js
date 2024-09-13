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
exports.UserAccountRepositoryImp = void 0;
const userAccountSchema_1 = require("../database/userAccountSchema");
class UserAccountRepositoryImp {
    constructor(userId) {
        this.userId = userId;
    }
    createAccount(accountInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userAccountSchema_1.UserAccountSchema.create(accountInfo);
        });
    }
    findAccountByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userAccountSchema_1.UserAccountSchema.findOne({ email });
        });
    }
    findAccountByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userAccountSchema_1.UserAccountSchema.findOne({ phone });
        });
    }
    findAccountByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            // this methods returns false if no account with the provided username exist and true if it does.
            const account = yield userAccountSchema_1.UserAccountSchema.findOne({ username: username });
            if (account)
                return true;
            return false;
        });
    }
    updateEmail(newEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userAccountSchema_1.UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { email: newEmail } });
        });
    }
    updatePhone(newPhone) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userAccountSchema_1.UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { phone: newPhone } });
        });
    }
    updatePassword(newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userAccountSchema_1.UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { password: newPassword } });
        });
    }
    updateUsername(newUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userAccountSchema_1.UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { username: newUsername } });
        });
    }
    updateMediumOfCommunication(newMedium) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userAccountSchema_1.UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { mediumOfCommu: newMedium } });
        });
    }
    updateVerfCode(newVerfCode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userAccountSchema_1.UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { verfCode: newVerfCode } });
        });
    }
    updateIsAccountVerified(isVerified) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userAccountSchema_1.UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { isAccountVerified: isVerified } });
        });
    }
    updateIsIdentityVerified(isVerified) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userAccountSchema_1.UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { isIdentityVerified: isVerified } });
        });
    }
    updateProfile(newProfile) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userAccountSchema_1.UserAccountSchema.findByIdAndUpdate(this.userId, { $set: { profile: newProfile } });
        });
    }
}
exports.UserAccountRepositoryImp = UserAccountRepositoryImp;
