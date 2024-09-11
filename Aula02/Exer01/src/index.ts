import express from "express";
import mongoose from "mongoose";
import carRoutes from "./routes/car";
import carByPersonRoutes from "./routes/carbyperson";
import personRoutes from "./routes/person";
import phoneRoutes from "./routes/phone";
import dotenv from "dotenv";

// Carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Inicializa o aplicativo Express
const app = express();

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());

// Configuração das rotas
app.use("/cars", carRoutes);
app.use("/carbyperson", carByPersonRoutes);
app.use("/people", personRoutes);
app.use("/phones", phoneRoutes);

// Iniciar o servidorapp.use(express.json());
app.use(express.json());

// Configuração das rotas
app.use("/cars", carRoutes);
app.use("/carbyperson", carByPersonRoutes);
app.use("/people", personRoutes);
app.use("/phones", phoneRoutes);

// Conectar ao MongoDB
const mongoURI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ldw_exer01"; // Defina seu URI do MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB", err);
  });

// Iniciar o servidor
const PORT = process.env.PORT || 3000; // Pega a porta das variáveis de ambiente ou usa a porta 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
