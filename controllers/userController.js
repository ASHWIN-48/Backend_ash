import { sendSuccess } from "../utils/responseHandler.js"
import { registerUser, loginUser, refreshAccessToken } from "../services/userService.js"

const register = async (req, res) => {
  const { name, email, password } = req.body
  const { user, accessToken, refreshToken } = await registerUser(name, email, password)
  sendSuccess(res, 201, "User registered successfully", { user, accessToken, refreshToken })
}

const login = async (req, res) => {
  const { email, password } = req.body
  const { user, accessToken, refreshToken } = await loginUser(email, password)
  sendSuccess(res, 200, "Login successful", { user, accessToken, refreshToken })
}

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body
  const { accessToken, refreshToken: newRefreshToken } = await refreshAccessToken(refreshToken)
  sendSuccess(res, 200, "Token refreshed successfully", { accessToken, refreshToken: newRefreshToken })
}


export { register,login,refreshToken }