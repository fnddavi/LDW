import { Router } from "express";
import ExpenseController from "../controllers/expense-controller";

const router = Router();
const expenseController = new ExpenseController();

router.post("/expenses", expenseController.create);
router.get("/expenses", expenseController.getAll);

export default router;
