import { Request, Response } from "express";
import Expense from "../models/Expense";

class ExpenseController {
    static async createExpense(req: Request, res: Response): Promise<Response> {
        try {
            console.log("Criando nova despesa...");
            const { description, amount, date } = req.body;

            // Validação: amount deve ser maior que zero
            if (amount <= 0) {
                console.error("Valor inválido: Deve ser maior que zero.");
                return res.status(400).json({ message: "O valor deve ser maior que zero." });
            }

            const despesa = new Expense({ description, amount, date });
            const novaDespesa = await despesa.save();

            return res.status(201).json(novaDespesa);
        } catch (error) {
            console.error("Erro ao criar despesa", error);
            return res.status(500).json({ message: "Erro ao criar despesa", error });
        }
    }

    static async getExpense(req: Request, res: Response) {
        try {
            const despesas = await Expense.find();
            return res.status(200).json(despesas);
        } catch (error) {
            console.error("Erro ao obter despesas:", error);
            return res.status(500).json({ message: "Erro ao obter clientes", error });
        }
    }

    static async updateExpense(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { description, amount, date } = req.body;

            // Validação: amount deve ser maior que zero
            if (amount <= 0) {
                console.error("Valor inválido: Deve ser maior que zero.");
                return res.status(400).json({ message: "O valor deve ser maior que zero." });
            }

            const despesaAtualizada = await Expense.findByIdAndUpdate(
                id,
                { description, amount, date },
                { new: true }
            );

            if (!despesaAtualizada) {
                return res.status(404).json({ message: "Despesa não encontrada" });
            }

            return res.status(200).json(despesaAtualizada);
        } catch (error) {
            console.error("Erro ao atualizar a despesa:", error);
            return res.status(500).json({ message: "Erro ao atualizar a despesa", error });
        }
    }

    static async deleteExpense(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            const despesaRemovida = await Expense.findByIdAndDelete(id);

            if (!despesaRemovida) {
                return res.status(404).json({ message: "Despesa não encontrada" });
            }

            return res.status(200).json({ message: "Despesa excluída com sucesso" });
        } catch (error) {
            console.error("Erro ao excluir a despesa:", error);
            return res.status(500).json({ message: "Erro ao excluir a despesa", error });
        }
    }

    static async getTotalExpenses(req: Request, res: Response): Promise<Response> {
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

            return res.status(200).json(totalAmount);
        } catch (error) {
            console.error("Erro ao excluir a despesa:", error);
            return res.status(500).json({ message: "Erro ao excluir a despesa", error });
        }
    }
}

export default ExpenseController;
