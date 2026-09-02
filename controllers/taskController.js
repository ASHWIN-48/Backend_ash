import { sendSuccess } from "../utils/responseHandler.js"
import { getalltasks, createTask, getTaskById, updateTask, deleteTask } from "../services/taskService.js"

const getTasks = async (req, res) => {
  const tasks = await getalltasks()
  sendSuccess(res, 200, "Tasks fetched successfully", tasks)
}

const addTask = async (req, res) => {
  const { title } = req.body
  const newTask = await createTask(title)
  sendSuccess(res, 201, "Task created successfully", newTask)
}

const getTask = async (req, res) => {
  const { id } = req.params
  const task = await getTaskById(id)
  sendSuccess(res, 200, "Task fetched successfully", task)
}

const updateTaskController = async (req, res) => {
  const { id } = req.params
  const updatedTask = await updateTask(id, req.body)
  sendSuccess(res, 200, "Task updated successfully", updatedTask)
}

const removeTask = async (req, res) => {
  const { id } = req.params
  const deletedTask = await deleteTask(id)
  sendSuccess(res, 200, "Task deleted successfully", deletedTask)
}

export { getTasks, addTask, getTask, updateTaskController, removeTask }


// try catch to await then for response did senderror and success