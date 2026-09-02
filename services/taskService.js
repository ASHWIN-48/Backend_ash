import Task from "../models/taskModel.js"

const getalltasks = async () => {
  const tasks = await Task.find()
  return tasks
}

const createTask = async (title) => {
  const newTask = await Task.create({ title })
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

const updateTask = async (id, updates) => {
  const task = await Task.findById(id)
  if (!task) {
    const error = new Error("Task not found")
    error.status = 404
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

const deleteTask = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  if (!task) {
    const error = new Error("Task not found")
    error.status = 404
    throw error
  }
  return task
}

export { getalltasks, createTask, getTaskById, updateTask, deleteTask }
// let tasks=[];           // fake db
// let currentId=1;       //auto increment


// const getalltasks=async() =>{
//     return tasks;
// };

// const createTask= async(title)=>{
//     if(!title){
//         const error=new Error("Title is required");
//         error.status=400;
//         throw error;
//     }
//     const newTask={
//         id:String(currentId++),
//         title,
//         completed:false
//     };

//     tasks.push(newTask);
//     return newTask;
// };


// const getTaskById= async (id)=>{

//     const task=tasks.find(t=>t.id=== id);

//     if(!task){
//         const error=new Error("Task not found");
//         error.status=404;
//         throw error;
//     }
//     return task;
// }
// const updateTask = async(id, updates) => {
//   const task = tasks.find(t => t.id === id);

//   if (!task) {
//     const error = new Error("Task not found");
//     error.status = 404;
//     throw error;
//   }

//   if (updates.title !== undefined) {
//     if (!updates.title) {
//       const error = new Error("Title cannot be empty");
//       error.status = 400;
//       throw error;
//     }
//     task.title = updates.title;
//   }

//   if (updates.completed !== undefined) {
//     task.completed = updates.completed;
//   }

//   return task;
// };

// const deleteTask=async(id)=>{
//   const index= tasks.findIndex(t=>t.id===id);
//   if(index===-1){
//     const error = new Error("Task not found");
//       error.status = 404;
//       throw error;
//     }
//     const deletedTask=tasks.splice(index,1)[0];
//     return deletedTask;
//   };



// export{getalltasks, createTask,getTaskById,updateTask, deleteTask };


