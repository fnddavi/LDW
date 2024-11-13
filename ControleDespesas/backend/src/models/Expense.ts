import mongoose, { Schema, Document } from "mongoose";
import { Request, Response } from "express";

interface IExpense extends Document {
  description: string;
  amount: number;
  date: Date;
}

const ExpenseSchema: Schema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Expense = mongoose.model<IExpense>("Expense", ExpenseSchema);

export const getTotalExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const total = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalAmount = total.length > 0 ? total[0].totalAmount : 0;
    res.json({ totalAmount });
  } catch (error) {
    res.status(500).json({ error: "Erro ao calcular o total das despesas" });
  }
};

export default Expense;
//