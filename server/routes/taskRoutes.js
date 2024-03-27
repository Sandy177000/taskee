import { Router } from "express";
import { addTask, deleteTask, getAllTasks, getSortedTasks, updateTask } from "../controllers/taskController.js";


export const taskRouter = Router();

taskRouter
.post("/add-task", addTask)
.get("/get-all-tasks",getAllTasks)
.post("/delete-task",deleteTask)
.put("/update-task",updateTask)
.get("/get-sorted-tasks",getSortedTasks)

