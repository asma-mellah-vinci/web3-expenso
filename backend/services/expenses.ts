import type { Expense } from "../types/Expense.ts";
import { db } from "../src/prisma/db.ts";

import fs from "node:fs";
const dataPath = "./data/expenses.json";
const dataInitPath = "./data/expenses.init.json";


async function getAllExpenses() {
    const expenses = await db.orm.public.Expense.all();
    return expenses;
}


async function addExpense(expense : Expense) {
    const newExpense = await db.orm.public.Expense.create({
        date : expense.date,
        description : expense.description,
        payer       : expense.payer,
        amount      : expense.amount,
    });
    return newExpense;
}

function resetExpenses() : Expense[] {
    const initData = fs.readFileSync(dataInitPath, "utf-8");
    const initExpenses : Expense[] = JSON.parse(initData);

    fs.writeFileSync(dataPath, JSON.stringify(initExpenses, null, 2));
    return initExpenses;
}

export {getAllExpenses, addExpense, resetExpenses}