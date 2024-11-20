import { Router, Request, Response } from "express";
import ExpenseController from "../controllers/expense-controller";

const router = Router();
const expenseController = new ExpenseController();

router.post("/expenses", (req: Request, res: Response) => {
  expenseController.create(req, res);
});
router.get("/expenses", (req: Request, res: Response) => {
  expenseController.getAll(req, res);
});
router.get("/expenses/:id", (req: Request, res: Response) => {
  expenseController.getOne(req, res);
});
router.put("/expenses/:id", (req: Request, res: Response) => {
  expenseController.update(req, res);
});
router.delete("/expenses/:id", (req: Request, res: Response) => {
  expenseController.delete(req, res);
});
router.get("/expenses/total", (req: Request, res: Response) => {
  expenseController.getTotal(req, res);
});

export default router;
//