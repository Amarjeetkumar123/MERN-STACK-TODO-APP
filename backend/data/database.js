
import mongoose from "mongoose";

const DB_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/nodeApi";

export const connectDB = mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

