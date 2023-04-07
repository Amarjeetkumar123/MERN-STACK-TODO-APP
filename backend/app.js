import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";

export const app = express();

config({
  path: "./data/config.env",
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Router
app.use("/api/v1/users", userRouter);
app.use("/api/v2/todos", taskRouter);
