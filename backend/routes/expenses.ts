import { Router } from "express";
import { addExpense, getAllExpenses, resetExpenses } from "../services/expenses.ts";

// VERIFIER LES PARAMETRE
import { z } from "zod";

const router = Router();

router.get("/expenses", async (req, res) => {
    try {

        const schema = z.object({
            amount  : z.coerce.number().nonnegative().optional(),
            payerId : z.coerce.number().int().positive().optional(),
            categoryId : z.coerce.number().int().positive().optional()
        });

        const result = schema.safeParse(req.query);

        if(!result.success){
            return res.status(400).json({error : "Paramètres de recherche invalides"});
        }

        const expenses = await getAllExpenses(result.data);
        return res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
        return res.status(500).json("INTERNAL ERROR");
    }
});


router.post("/expenses", async (req, res ) => {
    try {

        const schema = z.object({
            date: z.string().min(1),
            description: z.string().min(1),
            payer: z.string().min(1),
            amount: z.number().positive(),
            categoryId: z.number().int().positive().nullable().optional()
        });

        const result = schema.safeParse(req.body);

        if(!result.success){
            return res.status(400).json({error : "Données de dépense invalides"});
        }

        const expense = await addExpense(result.data);
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