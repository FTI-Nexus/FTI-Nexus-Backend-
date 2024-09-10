import { Router, Request, Response } from "express";
import { signupController } from "../controllers/authControllers";



export const authRouter=Router()


// auth routes
authRouter.post("/signup",signupController)