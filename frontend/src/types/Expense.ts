import type { Identifiable } from "./Core";

export interface ExpenseInput {
    date        : string;
    description : string;
    payer       : string;
    amount      : number;
    categoryId? : number | null; 
}


export interface Expense extends ExpenseInput, Identifiable {}
