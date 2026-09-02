import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/userModel.js"
const registerUser = async (name, email, password) => {
  const newUser = await User.create({ name, email, password })
  newUser.password = undefined
  const token = jwt.sign(
  { id: newUser._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
)
  return { user: newUser, token }
}

const loginUser=async(email,password) =>{
  const findUser=await User.findOne({ email }).select("+password")
  if (!findUser) { 
    const error = new Error("Invalid credentials")
    error.status = 401
    throw error }
  const isMatch = await bcrypt.compare(password, findUser.password)
  if (!isMatch) { 
    const error = new Error("Invalid credentials")
    error.status = 401
    throw error }
  findUser.password = undefined
   const token = jwt.sign(
  { id: findUser._id },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
)
  return {user:findUser,token}
}



export{registerUser, loginUser}


