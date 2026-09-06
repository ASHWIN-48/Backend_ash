import express from "express";
import asyncHandler from "../utils/asynHandler.js";
import { getTasks, addTask,getTask,updateTaskController ,removeTask} from "../controllers/taskController.js";
import validate from "../middleware/validate.js";
import { createTaskValidation } from "../validators/taskValidator.js";
import { taskIdValidation,updateTaskValidation } from "../validators/taskValidator.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", asyncHandler(protect), asyncHandler(getTasks));

router.post("/",createTaskValidation,validate,asyncHandler(protect),asyncHandler(addTask));

router.get("/:id",asyncHandler(protect), asyncHandler(getTask));

router.put("/:id",taskIdValidation,updateTaskValidation,validate,asyncHandler(updateTaskController));

router.delete("/:id",asyncHandler(protect), asyncHandler(adminOnly),asyncHandler(removeTask));


// router.get("/", (req, res) => {
//   res.send("Tasks route working");
// });

// router.get("/", asyncHandler(getTasks));
// router.post("/", asyncHandler(addTask));
// router.get("/:id", asyncHandler(getTask));
// router.put("/:id", asyncHandler(updateTaskController));
// router.delete("/:id", asyncHandler(removeTask));
// router.post("/",createTaskValidation,validate,asyncHandler(addTask));
// router.put("/:id",taskIdValidation,updateTaskValidation,validate,asyncHandler(updateTaskController));

export default router;

