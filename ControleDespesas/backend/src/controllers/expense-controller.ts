import { Request, Response } from 'express';
import Expense, { IExpense } from '../models/Expense';

export default class ExpenseController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const expense: IExpense = await Expense.create(req.body);
            return res.status(201).json(expense);
        } catch (error) {
            return res.status(500).json({ error: 'Error creating expense' });
        }
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const expenses: IExpense[] = await Expense.find().sort({ date: -1 });
            return res.json(expenses);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching expenses' });
        }
    }

    public async getOne(req: Request, res: Response): Promise<Response> {
        try {
            const expense: IExpense | null = await Expense.findById(req.params.id);
            if (!expense) return res.status(404).json({ error: 'Expense not found' });
            return res.json(expense);
        } catch (error) {
            return res.status(500).json({ error: 'Error fetching expense' });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const expense: IExpense | null = await Expense.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!expense) return res.status(404).json({ error: 'Expense not found' });
            return res.json(expense);
        } catch (error) {
            return res.status(500).json({ error: 'Error updating expense' });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const expense: IExpense | null = await Expense.findByIdAndDelete(req.params.id);
            if (!expense) return res.status(404).json({ error: 'Expense not found' });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Error deleting expense' });
        }
    }

    public async getTotal(req: Request, res: Response): Promise<Response> {
        try {
            const result = await Expense.aggregate([
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$amount' }
                    }
                }
            ]);
            
            const total = result.length > 0 ? result[0].total : 0;
            return res.json({ total });
        } catch (error) {
            return res.status(500).json({ error: 'Error calculating total' });
        }
    }
}
