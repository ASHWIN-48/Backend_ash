import express from "express"
import dotenv from "dotenv"
import taskRoutes from "./routes/taskRoutes.js"
import errorMiddleware from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
app.use("/tasks", taskRoutes)
app.use("/users", userRoutes)
app.use(errorMiddleware)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})