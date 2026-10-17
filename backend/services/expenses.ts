import type { Expense, ExpenseInput } from "../types/Expense.ts";
import { db } from "../src/prisma/db.ts";

import fs from "node:fs";
const dataPath = "./data/expenses.json";
const dataInitPath = "./data/expenses.init.json";

interface ExpenseFilter {
    amount?  : number;
    payerId? : number;
    categoryId? : number;
}

async function getAllExpenses(filter : ExpenseFilter = {}) {
    const expenses = await db.orm.public.Expense.all();

    return expenses.filter((expense) => {
        const matchAmount = filter.amount === undefined || expense.amount >= filter.amount;
        const matchPayer  = filter.payerId === undefined || expense.payerId === filter.payerId;
        const matchCategory = filter.categoryId === undefined || expense.categoryId === filter.categoryId;

        return matchAmount && matchPayer && matchCategory;
    });

}


async function addExpense(expense : ExpenseInput) {
    const users = await db.orm.public.User.all();
    const user  = users.find(u => u.name === expense.payer);

    if(!user){
        throw new Error("Utilisateur introuvable");
    }


    const newExpense = await db.orm.public.Expense.create({
        date : expense.date,
        description : expense.description,
        payerId     : user.id,
        amount      : expense.amount,
        categoryId  : expense.categoryId ?? null
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