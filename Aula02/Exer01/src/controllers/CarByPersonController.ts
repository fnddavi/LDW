import { Request, Response } from "express";
import { CarByPerson } from "../models/index"; // Certifique-se de importar corretamente o modelo

// Buscar todas as associações de pessoas e carros
export const getCarByPerson = async (req: Request, res: Response) => {
  try {
    const carByPerson = await CarByPerson.find()
      .populate("idcar")
      .populate("idpeople");
    res.status(200).json(carByPerson);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar associações", error });
  }
};

// Buscar uma associação por ID
export const getCarByPersonById = async (req: Request, res: Response) => {
  try {
    const carByPerson = await CarByPerson.findById(req.params.id)
      .populate("idcar")
      .populate("idpeople");
    if (!carByPerson)
      return res.status(404).json({ message: "Associação não encontrada" });
    res.status(200).json(carByPerson);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar associação", error });
  }
};

// Criar uma nova associação entre uma pessoa e um carro
export const createCarByPerson = async (req: Request, res: Response) => {
  try {
    const newCarByPerson = new CarByPerson(req.body);
    const savedCarByPerson = await newCarByPerson.save();
    res.status(201).json(savedCarByPerson);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar associação", error });
  }
};

// Atualizar uma associação por ID
export const updateCarByPerson = async (req: Request, res: Response) => {
  try {
    const updatedCarByPerson = await CarByPerson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCarByPerson)
      return res.status(404).json({ message: "Associação não encontrada" });
    res.status(200).json(updatedCarByPerson);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar associação", error });
  }
};

// Deletar uma associação por ID
export const deleteCarByPerson = async (req: Request, res: Response) => {
  try {
    const deletedCarByPerson = await CarByPerson.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCarByPerson)
      return res.status(404).json({ message: "Associação não encontrada" });
    res.status(200).json({ message: "Associação deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar associação", error });
  }
};
