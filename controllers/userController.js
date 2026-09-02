import { sendSuccess } from "../utils/responseHandler.js"
import { registerUser , loginUser} from "../services/userService.js"

const register = async (req, res) => {
  const { name, email, password } = req.body
  const { user, token } = await registerUser(name, email, password)
  sendSuccess(res, 201, "User registered successfully", {user,token})
}
const login = async (req, res) => {
  const { email, password } = req.body
  const { user, token }= await loginUser(email, password)
  sendSuccess(res, 200, "Login successful", {user,token})
}


export { register,login }