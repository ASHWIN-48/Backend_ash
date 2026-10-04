import { sendSuccess } from "../utils/responseHandler.js"
import { getalltasks, createTask, getTaskById, updateTask, deleteTask } from "../services/taskService.js"

const getTasks = async (req, res) => {
  const { page = 1, limit = 10, completed } = req.query
  const filters = {}
  if (completed !== undefined) filters.completed = completed === "true"
  const result = await getalltasks(Number(page), Number(limit), filters)
  sendSuccess(res, 200, "Tasks fetched successfully", result)
}

const addTask = async (req, res) => {
  const { title } = req.body
  const newTask = await createTask(title, req.user._id)
  sendSuccess(res, 201, "Task created successfully", newTask)
}

const getTask = async (req, res) => {
  const { id } = req.params
  const task = await getTaskById(id)
  sendSuccess(res, 200, "Task fetched successfully", task)
}

const updateTaskController = async (req, res) => {
  const { id } = req.params
  const updatedTask = await updateTask(id, req.body, req.user)
  sendSuccess(res, 200, "Task updated successfully", updatedTask)
}

const removeTask = async (req, res) => {
  const { id } = req.params
  const deletedTask = await deleteTask(id, req.user)
  sendSuccess(res, 200, "Task deleted successfully", deletedTask)
}

export { getTasks, addTask, getTask, updateTaskController, removeTask }