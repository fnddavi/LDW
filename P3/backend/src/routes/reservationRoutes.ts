import express, { Request, Response } from "express";
import { createReservation, deleteReservation, getReservations, updateReservation } from "../controllers/reservationController";

const router = express.Router();

router.post("/", (req: Request, res: Response) => createReservation(req, res));
router.get("/", (req: Request, res: Response) => getReservations(req, res));
router.put("/:id", (req: Request, res: Response) => updateReservation(req, res));
router.delete("/:id", (req: Request, res: Response) => deleteReservation(req, res));

export default router;
