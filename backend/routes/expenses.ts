import { Router } from "express";
import { addExpense, getAllExpenses, resetExpenses } from "../services/expenses.ts";
import type { Expense } from "../types/Expense.ts";

const router = Router();

router.get("/expenses", (_req, res) => {
    try {
        const expenses = getAllExpenses();
        return res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
        return res.status(500).json("INTERNAL ERROR");
    }
});


router.post("/expenses",(req, res ) => {
    try {
        const body : Expense = req.body;
        const expense = addExpense(body);
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