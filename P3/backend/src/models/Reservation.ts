import { Schema, model, Document } from "mongoose";

export interface IReservation extends Document {
  customerName: string;
  tableNumber: number;
  reservationDate: Date;
  status: "reserved" | "occupied" | "available";
  customerContact: string;
}

const reservationSchema = new Schema<IReservation>({
  customerName: { type: String, required: true },
  tableNumber: { type: Number, required: true },
  reservationDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["reserved", "occupied", "available"],
    required: true,
  },
  customerContact: { type: String, required: true },
});

export const Reservation = model<IReservation>(
  "Reservation",
  reservationSchema
);
