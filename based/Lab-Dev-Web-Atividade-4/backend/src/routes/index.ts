import { Router } from "express";
import expense from "./Event";

const router = Router();

router.use("/evento", expense);

export default router;