import { Router } from "express";
import {EventController} from "../controllers";

const router = Router();

router.post("/", EventController.createEvent);
router.get("/", EventController.getAllEvents);
router.get("/:id", EventController.getEventById);
router.put("/:id", EventController.updateEvent);
router.delete("/:id", EventController.deleteEvent);

export default router;