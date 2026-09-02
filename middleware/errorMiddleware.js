// const errorMiddleware = (err, req, res, next) => {
//   console.error(err.stack)
//   console.log("Error middleware triggered")
//   sendError(res, err.status || 500, err.message || "Server Error")
// }

// export default errorMiddleware

import { sendError } from "../utils/responseHandler.js"

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack)

  // Mongoose CastError — invalid ID format
  if (err.name === "CastError") {
    return sendError(res, 400, "Invalid ID format")
  }

  // Mongoose ValidationError — schema validation failed
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message)
    return sendError(res, 400, messages.join(", "))
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    return sendError(res, 400, "Duplicate value entered for a unique field")
  }

  // Default — system error
  sendError(res, err.status || 500, err.message || "Server Error")
}

export default errorMiddleware