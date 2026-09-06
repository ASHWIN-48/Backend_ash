import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import User from "../models/userModel.js"
const registerUser = async (name, email, password) => {
  const newUser = await User.create({ name, email, password })
  newUser.password = undefined
  const { accessToken, refreshToken } = generateTokens(newUser._id)
  return { user: newUser, accessToken, refreshToken }
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
  const { accessToken, refreshToken } = generateTokens(findUser._id)
  return { user: findUser, accessToken, refreshToken }}
 
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  )
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  )
  return { accessToken, refreshToken }
}


const refreshAccessToken = (refreshToken) => {
  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
  const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.id)
  return { accessToken, refreshToken: newRefreshToken }
}



export{registerUser, loginUser, generateTokens,refreshAccessToken}


