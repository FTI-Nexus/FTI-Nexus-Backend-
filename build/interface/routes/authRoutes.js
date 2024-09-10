"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
exports.authRouter = (0, express_1.Router)();
// auth routes
exports.authRouter.post("/signup", authControllers_1.signupController);
