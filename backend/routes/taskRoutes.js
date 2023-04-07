import express from "express"
import { newTask } from "../controllers/taskFunctions.js";

const router = express.Router();

router.post('/newtodo', newTask);


export default router