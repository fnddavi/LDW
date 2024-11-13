import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import expensesRoutes from "./routes/expenses";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/expenseTracker");

app.use("/api", expensesRoutes);

export default app;
//