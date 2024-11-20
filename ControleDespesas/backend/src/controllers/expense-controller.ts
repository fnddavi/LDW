import { Request, Response } from "express";
import Expense, { IExpense } from "../models/expense-model";

export default class ExpenseController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const expense: IExpense = await Expense.create(req.body);
      return res.status(201).json(expense);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar despesa" });
    }
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const expenses: IExpense[] = await Expense.find().sort({ date: -1 });
      return res.json(expenses);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar despesas" });
    }
  }

  public async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const expense: IExpense | null = await Expense.findById(req.params.id);
      if (!expense)
        return res.status(404).json({ error: "Despesa não encontrada" });
      return res.json(expense);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar despesa" });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const expense: IExpense | null = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!expense)
        return res.status(404).json({ error: "Despesa não encontrada" });
      return res.json(expense);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar despesa" });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const expense: IExpense | null = await Expense.findByIdAndDelete(
        req.params.id
      );
      if (!expense)
        return res.status(404).json({ error: "Despesa não encontrada" });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar despesa" });
    }
  }

  public async getTotal(req: Request, res: Response): Promise<Response> {
    try {
      const result = await Expense.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]);

      const total = result.length > 0 ? result[0].total : 0;
      return res.json({ total });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao calcular total" });
    }
  }
}
//