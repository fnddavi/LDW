import { Router } from "express";
import { addState, getStates } from "../controllers/StateController";

const router = Router();

router.post("/states", addState);
router.get("/states", getStates);

export default router;
