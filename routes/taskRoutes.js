
import express from "express";
import asyncHandler from "../utils/asynHandler.js";
import { getTasks, addTask, getTask, updateTaskController, removeTask } from "../controllers/taskController.js";
import validate from "../middleware/validate.js";
import { createTaskValidation } from "../validators/taskValidator.js";
import { taskIdValidation, updateTaskValidation } from "../validators/taskValidator.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();



/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks (paginated, filterable)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         example: true
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: No or invalid token
 */
router.get("/", asyncHandler(protect), asyncHandler(getTasks));

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Buy groceries
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: No or invalid token
 */
router.post("/", createTaskValidation, validate, asyncHandler(protect), asyncHandler(addTask));

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a single task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *       404:
 *         description: Task not found
 */
router.get("/:id", asyncHandler(protect), asyncHandler(getTask));

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task (owner or admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       403:
 *         description: Not authorized to update this task
 *       404:
 *         description: Task not found
 */
router.put("/:id", taskIdValidation, updateTaskValidation, validate, asyncHandler(protect), asyncHandler(updateTaskController));

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task (owner or admin only)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       403:
 *         description: Not authorized to delete this task
 *       404:
 *         description: Task not found
 */
router.delete("/:id", asyncHandler(protect), asyncHandler(removeTask));

export default router;