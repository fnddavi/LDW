import { Request, Response } from "express";
import { Customer } from "../models/customer";

// Criar um novo cliente
export const createCustomer = async (req: Request, res: Response) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar cliente", error });
  }
};

// Listar todos os clientes
export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar clientes", error });
  }
};

// Atualizar um cliente
export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar cliente", error });
  }
};

// Deletar um cliente
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cliente excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir cliente", error });
  }
};
