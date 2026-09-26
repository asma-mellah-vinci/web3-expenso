import type { Expense } from "../types/Expense.ts";

import fs from "node:fs";
const dataPath = "./data/expenses.json";
const dataInitPath = "./data/expenses.init.json";


function getAllExpenses() : Expense[] {
    const data = fs.readFileSync(dataPath, "utf-8");
    const expenses : Expense[] = JSON.parse(data);
    return expenses;
}


function addExpense(expense : Expense) : Expense {
    const expenses = getAllExpenses();

    expenses.push(expense);

    fs.writeFileSync(dataPath, JSON.stringify(expenses, null, 2));
    return expense;
}

function resetExpenses() : Expense[] {
    const initData = fs.readFileSync(dataInitPath, "utf-8");
    const initExpenses : Expense[] = JSON.parse(initData);

    fs.writeFileSync(dataPath, JSON.stringify(initExpenses, null, 2));
    return initExpenses;
}

export {getAllExpenses, addExpense, resetExpenses}