import express from "express";
import connectDB from "./models/connection";
import stateRoutes from "./routes/state";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Rotas
app.use("/api", stateRoutes);

// Conectar ao MongoDB e iniciar o servidor
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
