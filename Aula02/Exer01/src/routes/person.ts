import { Router } from "express";
import {
  getPeople,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
} from "../controllers/PersonController";

const router = Router();

router.get("/", getPeople); // Buscar todas as pessoas
router.get("/:id", getPersonById); // Buscar uma pessoa por ID
router.post("/", createPerson); // Criar uma nova pessoa
router.put("/:id", updatePerson); // Atualizar uma pessoa por ID
router.delete("/:id", deletePerson); // Deletar uma pessoa por ID

export default router;
