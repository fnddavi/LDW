import { Router } from 'express';
import ExpenseController from '../controllers/ExpenseController';

const router = Router();
const expenseController = new ExpenseController();

router.post('/expenses', expenseController.create);
router.get('/expenses',