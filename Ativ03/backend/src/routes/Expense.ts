import { Router } from "express";
import {ExpenseController} from "../controllers";

const router = Router();

router.post("/", ExpenseController.createExpense);
router.get("/", ExpenseController.getExpense);
router.put("/:id", ExpenseController.updateExpense);
router.delete("/:id", ExpenseController.deleteExpense);
router.get("/total", ExpenseController.getTotalExpenses);

export default router;