

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    const error = new Error("Not authorized as admin")
    error.status = 403
    throw error
  }
  next()
}

export default adminOnly