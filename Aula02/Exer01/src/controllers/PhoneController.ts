import { Request, Response } from "express";
import { Phone } from "../models/index"; // Certifique-se de importar corretamente o modelo

// Buscar todos os telefones
export const getPhones = async (req: Request, res: Response) => {
  try {
    const phones = await Phone.find().populate("idpeople");
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar telefones", error });
  }
};

// Buscar um telefone por ID
export const getPhoneById = async (req: Request, res: Response) => {
  try {
    const phone = await Phone.findById(req.params.id).populate("idpeople");
    if (!phone)
      return res.status(404).json({ message: "Telefone não encontrado" });
    res.status(200).json(phone);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar telefone", error });
  }
};

// Criar um novo telefone
export const createPhone = async (req: Request, res: Response) => {
  try {
    const newPhone = new Phone(req.body);
    const savedPhone = await newPhone.save();
    res.status(201).json(savedPhone);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar telefone", error });
  }
};

// Atualizar um telefone por ID
export const updatePhone = async (req: Request, res: Response) => {
  try {
    const updatedPhone = await Phone.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPhone)
      return res.status(404).json({ message: "Telefone não encontrado" });
    res.status(200).json(updatedPhone);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar telefone", error });
  }
};

// Deletar um telefone por ID
export const deletePhone = async (req: Request, res: Response) => {
  try {
    const deletedPhone = await Phone.findByIdAndDelete(req.params.id);
    if (!deletedPhone)
      return res.status(404).json({ message: "Telefone não encontrado" });
    res.status(200).json({ message: "Telefone deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar telefone", error });
  }
};
