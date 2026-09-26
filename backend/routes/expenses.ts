import { Router } from "express";
import { addExpense, getAllExpenses, resetExpenses } from "../services/expenses.ts";
import type { Expense, ExpenseInput } from "../types/Expense.ts";

const router = Router();

router.get("/expenses", async (_req, res) => {
    try {
        const expenses = await getAllExpenses();
        return res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
        return res.status(500).json("INTERNAL ERROR");
    }
});


router.post("/expenses", async (req, res ) => {
    try {
        const body : ExpenseInput = req.body;
        const expense = await  addExpense(body);
        return res.status(201).json(expense);
    } catch (error) {
        console.log(error);
        return res.status(500).json("INTERNAL ERROR");
    }
});

router.post("/expenses/reset", (req, res) => {
    try {
        const expenses = resetExpenses();
        return res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
        return res.status(500).json("INTERNAL ERROR");
    }
});

export default router;