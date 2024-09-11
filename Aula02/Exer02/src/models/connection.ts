import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/ldw_exer02"
    );
    console.log("MongoDB connected");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Erro desconhecido");
    }
    process.exit(1); // Encerra o servidor se falhar a conexão
  }
};

export default connectDB;
