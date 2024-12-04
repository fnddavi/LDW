import { Request, Response } from "express";
import { Reservation } from "../models/Reservation";
import { io } from "../server";

export const createReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    io.emit("reservationCreated", savedReservation);
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getReservations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { customerName, tableNumber } = req.query;
    const filter: any = {};
    if (customerName) filter.customerName = customerName as string;
    if (tableNumber) filter.tableNumber = Number(tableNumber);

    const reservations = await Reservation.find(filter);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedReservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    io.emit("reservationUpdated", updatedReservation);
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const deleteReservation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedReservation = await Reservation.findByIdAndDelete(id);
    if (!deletedReservation) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    io.emit("reservationDeleted", id);
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
