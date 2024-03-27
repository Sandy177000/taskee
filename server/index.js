import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { taskRouter } from "./routes/taskRoutes.js";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/task", taskRouter);

app.listen(3000, console.log("Server at 3000"));
