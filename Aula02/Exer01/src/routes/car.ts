import { Router } from "express";
import {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/CarController";


const router = Router();

router.get("/", getCars); // Buscar todos os carros
router.get("/:id", getCarById); // Buscar um carro por ID
router.post("/", createCar); // Criar um novo carro
router.put("/:id", updateCar); // Atualizar um carro por ID
router.delete("/:id", deleteCar); // Deletar um carro por ID

export default router;
