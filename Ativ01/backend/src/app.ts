import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import customerRoutes from "./routes/customerRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/customers", customerRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI não está definida no arquivo .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error("Failed to connect to MongoDB", err));
