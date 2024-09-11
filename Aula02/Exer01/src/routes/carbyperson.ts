import { Router } from "express";
import {
  getCarByPerson,
  getCarByPersonById,
  createCarByPerson,
  updateCarByPerson,
  deleteCarByPerson,
} from "../controllers/CarByPersonController";

const router = Router();

router.get("/", getCarByPerson); // Buscar todas as associações
router.get("/:id", getCarByPersonById); // Buscar uma associação por ID
router.post("/", createCarByPerson); // Criar uma nova associação
router.put("/:id", updateCarByPerson); // Atualizar uma associação por ID
router.delete("/:id", deleteCarByPerson); // Deletar uma associação por ID

export default router;
