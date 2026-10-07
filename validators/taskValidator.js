import{body,param} from "express-validator";
import mongoose from "mongoose"

export const createTaskValidation = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
];


// export const taskIdValidation=[
//     param("id")
//         .notEmpty()
//         .withMessage("Task ID is required")
//         .isNumeric()
//         .withMessage("Task ID must be a number")
// ];


export const taskIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("Task ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid task ID format")
]
export const updateTaskValidation = [
  // Reject empty body
  body().custom((value) => {
    if (!value || Object.keys(value).length === 0) {
      throw new Error("Request body cannot be empty");
    }
    return true;
  }),

  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
];

