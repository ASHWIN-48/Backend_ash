import Task from "../models/taskModel.js"
import redisClient from "../config/redisClient.js"

// const getalltasks = async (page = 1, limit = 10, filters = {}) => {
//   const skip = (page - 1) * limit
//   const query = {}
//   if (filters.completed !== undefined) {
//     query.completed = filters.completed
//   }
//   if (filters.owner) {
//     query.owner = filters.owner
//   }
//   const tasks = await Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
//   const total = await Task.countDocuments(query)
//   return { tasks, total, page, totalPages: Math.ceil(total / limit) }
// }

// services/taskService.js — add Redis import at top


const getalltasks = async (page = 1, limit = 10, filters = {}) => {
  const cacheKey = `tasks:${JSON.stringify({ page, limit, filters })}`

  const cached = await redisClient.get(cacheKey)
  if (cached) {
    return JSON.parse(cached)
  }

  const skip = (page - 1) * limit
  const query = {}
  if (filters.completed !== undefined) query.completed = filters.completed
  if (filters.owner) query.owner = filters.owner

  const tasks = await Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
  const total = await Task.countDocuments(query)
  const result = { tasks, total, page, totalPages: Math.ceil(total / limit) }

  await redisClient.setEx(cacheKey, 60, JSON.stringify(result))

  return result
}

const createTask = async (title, owner) => {
  const newTask = await Task.create({ title, owner })
  await redisClient.flushDb()  //abhi sab kar dega but proper use me specific keys karni hoti h
  return newTask
}

const getTaskById = async (id) => {
  const task = await Task.findById(id)
  if (!task) {
    const error = new Error("Task not found")
    error.status = 404
    throw error
  }
  return task
}

const updateTask = async (id, updates, currentUser) => {
  const task = await Task.findById(id)
  if (!task) {
    const error = new Error("Task not found")
    error.status = 404
    throw error
  }

  const isOwner = task.owner.toString() === currentUser._id.toString()
  const isAdmin = currentUser.role === "admin"
  if (!isOwner && !isAdmin) {
    const error = new Error("Not authorized to update this task")
    error.status = 403
    throw error
  }

  if (updates.title !== undefined) {
    if (!updates.title) {
      const error = new Error("Title cannot be empty")
      error.status = 400
      throw error
    }
    task.title = updates.title
  }
  if (updates.completed !== undefined) {
    task.completed = updates.completed
  }
  await task.save()
  return task
}

const deleteTask = async (id, currentUser) => {
  const task = await Task.findById(id)
  if (!task) {
    const error = new Error("Task not found")
    error.status = 404
    throw error
  }

  const isOwner = task.owner.toString() === currentUser._id.toString()
  const isAdmin = currentUser.role === "admin"
  if (!isOwner && !isAdmin) {
    const error = new Error("Not authorized to delete this task")
    error.status = 403
    throw error
  }

  await Task.findByIdAndDelete(id)
  return task
}

export { getalltasks, createTask, getTaskById, updateTask, deleteTask }