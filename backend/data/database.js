
import mongoose from "mongoose";

const DB_URL = process.env.MONGO_URL;

export const connectDB = mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => console.log(err));

