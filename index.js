import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import mongoSanitize from "express-mongo-sanitize"
import connectDB from "./config/db.js"
import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import errorMiddleware from "./middleware/errorMiddleware.js"

dotenv.config()
connectDB()

const app = express()

const allowedOrigins = ["http://localhost:5173", "https://yourapp.com"]

app.use(helmet())
app.use(cors({ origin: allowedOrigins, credentials: true }))

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later"
})
app.use(generalLimiter)

app.use(express.json())
app.use(mongoSanitize())

app.use("/tasks", taskRoutes)
app.use("/users", userRoutes)

app.use(errorMiddleware)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))