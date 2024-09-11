import { Request, Response } from "express";
import { Person } from "../models/index";

export const getPeople = async (req: Request, res: Response) => {
  try {
    const people = await Person.find()
      .populate("phones")
      .populate({
        path: "cars",
        populate: { path: "idcar" },
      });
    res.status(200).json(Person);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pessoas", error });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  try {
    const person = await Person.findById(req.params.id)
      .populate("phones")
      .populate({
        path: "cars",
        populate: { path: "idcar" },
      });
    if (!person)
      return res.status(404).json({ message: "Pessoa não encontrada" });
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pessoa", error });
  }
};

export const createPerson = async (req: Request, res: Response) => {
  try {
    const newPerson = new Person(req.body);
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar pessoa", error });
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPerson)
      return res.status(404).json({ message: "Pessoa não encontrada" });
    res.status(200).json(updatedPerson);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar pessoa", error });
  }
};

export const deletePerson = async (req: Request, res: Response) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(req.params.id);
    if (!deletedPerson)
      return res.status(404).json({ message: "Pessoa não encontrada" });
    res.status(200).json({ message: "Pessoa deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar pessoa", error });
  }
};
