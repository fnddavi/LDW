import express, { Request, Response } from "express";
import Expense from "../models/Expense";

const router = express.Router();

router.post("/expenses", async (req: Request, res: Response) => {
  const { description, amount, date } = req.body;
  const expense = new Expense({ description, amount, date });
  await expense.save();
  res.status(201).json(expense);
});

router.get("/expenses", async (req: Request, res: Response) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

router.put("/expenses/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, amount, date } = req.body;
  const expense = await Expense.findByIdAndUpdate(
    id,
    { description, amount, date },
    { new: true }
  );
  res.json(expense);
});

router.delete("/expenses/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await Expense.findByIdAndDelete(id);
  res.status(204).end();
});

export default router;
