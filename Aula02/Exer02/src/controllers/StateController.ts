import { Request, Response } from "express";
import { State } from "../models/index";

// Adicionar um estado
export const addState = async (req: Request, res: Response) => {
  try {
    const { name, cities } = req.body;
    const newState = new State({ name, cities });
    await newState.save();
    res.status(201).json(newState);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "Erro desconhecido" });
    }
  }
};

// Listar todos os estados
export const getStates = async (req: Request, res: Response) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Erro desconhecido" });
    }
  }
};
