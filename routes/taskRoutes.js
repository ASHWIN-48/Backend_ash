
import express from "express";
import asyncHandler from "../utils/asynHandler.js";
import { getTasks, addTask, getTask, updateTaskController, removeTask } from "../controllers/taskController.js";
import validate from "../middleware/validate.js";
import { createTaskValidation } from "../validators/taskValidator.js";
import { taskIdValidation, updateTaskValidation } from "../validators/taskValidator.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", asyncHandler(protect), asyncHandler(getTasks));

router.post("/", createTaskValidation, validate, asyncHandler(protect), asyncHandler(addTask));

router.get("/:id", asyncHandler(protect), asyncHandler(getTask));

router.put("/:id", taskIdValidation, updateTaskValidation, validate, asyncHandler(protect), asyncHandler(updateTaskController));

router.delete("/:id", asyncHandler(protect), asyncHandler(removeTask));

export default router;