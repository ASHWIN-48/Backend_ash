import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}
  },
  
  {
    timestamps: true
  }
)


taskSchema.index({ owner: 1, completed: 1 })
const Task = mongoose.model("Task", taskSchema)

export default Task