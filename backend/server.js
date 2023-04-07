
import { app } from "./app.js";
import { connectDB } from "./data/database.js";
// import { config } from "dotenv";
connectDB;

app.listen(process.env.PORT, () => {
  console.log(`server is running at http://localhost:${process.env.PORT}`);
});