import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
export const app = express();

config({
  path: "./data/config.env",
});

// middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials:true,
}));

// Router
app.use("/api/v1/users", userRouter);
app.use("/api/v2/todos", taskRouter);

// error handling middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Server Working Properly");
});
