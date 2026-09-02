import express from "express"
import asyncHandler from "../utils/asynHandler.js"
import { register,login } from "../controllers/userController.js"
import validate from "../middleware/validate.js"
import { registerValidation ,loginValidation } from "../validators/userValidator.js"


const router = express.Router()

router.post("/register", registerValidation, validate, asyncHandler(register))
router.post("/login", loginValidation, validate, asyncHandler(login))

export default router