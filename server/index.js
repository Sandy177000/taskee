import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { taskRouter } from "./routes/taskRoutes.js";
const app = express();

const port = process.env.PORT || 3000

app.use(
  cors({
    origin: "http://localhost:5173", // client
  })
);
app.use(express.json());
app.use("/api/task", taskRouter);

app.listen(port, (`Server running at ${port}`));
