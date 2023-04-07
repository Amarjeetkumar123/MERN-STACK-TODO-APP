import express from "express";
import {
  deleteMyTask,
  getMyTasks,
  newTask,
  updateMyTask,
} from "../controllers/taskFunctions.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

// create a new todo
router.post("/newtodo", isAuthenticated, newTask);
// get login user todos
router.get("/mytodos", isAuthenticated, getMyTasks);
// login user can update and delete the todos
router
  .route("/:id")
  .put(isAuthenticated, updateMyTask)
  .delete(isAuthenticated, deleteMyTask);

export default router;
