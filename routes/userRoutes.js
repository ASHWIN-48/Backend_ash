import express from "express"
import rateLimit from "express-rate-limit"
import asyncHandler from "../utils/asynHandler.js"
import { register, login, refreshToken } from "../controllers/userController.js"
import validate from "../middleware/validate.js"
import { registerValidation, loginValidation } from "../validators/userValidator.js"

const router = express.Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later"
})

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: ash@test.com
 *               password:
 *                 type: string
 *                 example: correctpassword
 *     responses:
 *       200:
 *         description: Login successful, returns user and tokens
 *       401:
 *         description: Invalid credentials
 */
router.post("/register", authLimiter, registerValidation, validate, asyncHandler(register))
router.post("/login", authLimiter, loginValidation, validate, asyncHandler(login))
router.post("/refresh", asyncHandler(refreshToken))

export default router