import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Not authorized, no token")
    error.status = 401
    throw error
  }

  const token = authHeader.split(" ")[1]

  const decoded = jwt.verify(token, process.env.JWT_SECRET)

  const user = await User.findById(decoded.id)
  if (!user) {
    const error = new Error("User no longer exists")
    error.status = 401
    throw error
  }

  req.user = user
  next()
}

export default protect