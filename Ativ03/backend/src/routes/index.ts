import { Router } from "express";
import expense from "./Expense";

const router = Router();

router.use("/despesa", expense);

export default router;