import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import reservationRoutes from "./routes/reservationRoutes";

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Origem do frontend
}));

app.use(express.json());
app.use("/reservations", reservationRoutes);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/restaurant", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

export default app;
