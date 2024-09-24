import { Router, Request, Response } from "express";
import { googleOAuthController, loginController, loginOAuthController, signupController, signupOAuthController } from "../controllers/authControllers";

export const authRouter = Router();
// auth routes
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *       - Account
 *     summary: Create a new account (Trader or Investor)
 *     description: |
 *       This endpoint allows users to create new trader or investor accounts. The request body must be provided in a format like exaple below:
 *       ```json
 *       {
 *         "email": "user@domain.com",
 *         "password": "password1624",
 *         "phone": "+233503742333",
 *         "firstName": "Hommy",
 *         "lastName": "Arthur Kendrick",
 *         "countryOfOrigin": "GH",
 *         "gender": "male",
 *         "dateOfBirth": "2024-11-16",
 *         "accountType": "trader"
 *       }
 *       ```
 *       All fields are required except for `password`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - phone
 *               - firstName
 *               - lastName
 *               - countryOfOrigin
 *               - gender
 *               - dateOfBirth
 *               - accountType
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Must be a valid email with no spaces.
 *               password:
 *                 type: string
 *                 description: Optional field.
 *               phone:
 *                 type: string
 *                 description: Must be a standard phone number containing only digits.
 *               firstName:
 *                 type: string
 *                 description: Can contain hyphens, no spaces allowed.
 *               lastName:
 *                 type: string
 *                 description: No leading or trailing spaces. Minimum length of 2 characters.
 *               countryOfOrigin:
 *                 type: string
 *                 description: Must be a valid 2-letter country ISO code.
 *               gender:
 *                 type: string
 *                 enum: [male, female, trans]
 *                 description: Must be either male, female, or trans.
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Must follow the format yyyy-mm-dd.
 *               accountType:
 *                 type: string
 *                 enum: [trader, investor]
 *                 description: Must be either trader or investor.
 *     responses:
 *       201:
 *         description: Account created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Account created successfully."
 *       400:
 *         description: Bad request. Missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No data passed for email field."
 *       409:
 *         description: Conflict. Account with email or phone already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Account already exist."
 */
authRouter.post("/signup", signupController);


/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Account
 *     summary: Password Login
 *     description: This is an endpoint for logging in with a password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *                 description: Email of the user (must be a valid email).
 *               password:
 *                 type: string
 *                 example: "Password123"
 *                 description: User's password.
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful."
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                   description: JWT token for accessing protected routes.
 *       400:
 *         description: Bad request. Missing or invalid fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No data passed for email or password"
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email and password."
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No account with this email exist"
 */
authRouter.post("/login", loginController);

// url for redirecting to third party auth page during signup
authRouter.get("/signup/:oAuthType", signupOAuthController);

// url for redirecting to third party auth page during login
authRouter.get("/login/:oAuthType",loginOAuthController)

// callback url for google after recieving consent from the user.
authRouter.get("/google-signup", googleOAuthController);


