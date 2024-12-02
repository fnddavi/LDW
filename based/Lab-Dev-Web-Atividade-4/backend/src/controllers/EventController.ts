import { Request, Response } from "express";
import Event from "../models/Event";

class EventController {
    // Método para criar um evento
    static async createEvent(req: Request, res: Response): Promise<Response> {
        try {
            const { description, title, local, date } = req.body;

            if (!description || !title || !local || !date) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios." });
            }

            const newEvent = new Event({ description, title, local, date });
            await newEvent.save();

            return res.status(201).json(newEvent);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar evento." });
        }
    }

    // Método para buscar todos os eventos
    static async getAllEvents(req: Request, res: Response): Promise<Response> {
        try {
            const events = await Event.find();
            return res.status(200).json(events);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar eventos." });
        }
    }

    // Método para buscar um evento específico por ID
    static async getEventById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "ID do evento é obrigatório." });
            }

            const event = await Event.findById(id);

            if (!event) {
                return res.status(404).json({ message: "Evento não encontrado." });
            }

            return res.status(200).json(event);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar evento." });
        }
    }

    // Método para atualizar um evento
    static async updateEvent(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { description, title, local, date } = req.body;

            if (!id) {
                return res.status(400).json({ message: "ID do evento é obrigatório." });
            }

            const updatedEvent = await Event.findByIdAndUpdate(
                id,
                { description, title, local, date },
                { new: true, runValidators: true }
            );

            if (!updatedEvent) {
                return res.status(404).json({ message: "Evento não encontrado." });
            }

            return res.status(200).json(updatedEvent);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar evento." });
        }
    }

    // Método para deletar um evento
    static async deleteEvent(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "ID do evento é obrigatório." });
            }

            const deletedEvent = await Event.findByIdAndDelete(id);

            if (!deletedEvent) {
                return res.status(404).json({ message: "Evento não encontrado." });
            }

            return res.status(200).json({ message: "Evento deletado com sucesso." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar evento." });
        }
    }
}

export default EventController;