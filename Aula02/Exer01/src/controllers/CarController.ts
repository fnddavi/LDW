import { Request, Response } from "express";
import { Car } from "../models/index";

export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar carros", error });
  }
};

export const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Carro não encontrado" });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar carro", error });
  }
};

export const createCar = async (req: Request, res: Response) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar carro", error });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCar)
      return res.status(404).json({ message: "Carro não encontrado" });
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar carro", error });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar)
      return res.status(404).json({ message: "Carro não encontrado" });
    res.status(200).json({ message: "Carro deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar carro", error });
  }
};
