import { Router } from "express";
import {
  getPhones,
  getPhoneById,
  createPhone,
  updatePhone,
  deletePhone,
} from "../controllers/PhoneController";

const router = Router();

router.get("/", getPhones); // Buscar todos os telefones
router.get("/:id", getPhoneById); // Buscar um telefone por ID
router.post("/", createPhone); // Criar um novo telefone
router.put("/:id", updatePhone); // Atualizar um telefone por ID
router.delete("/:id", deletePhone); // Deletar um telefone por ID

export default router;
