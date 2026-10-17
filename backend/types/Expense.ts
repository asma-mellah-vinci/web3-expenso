export interface Expense {
    id          : number;
    date        : string;
    description : string;
    payer       : string;
    amount      : number;
    categoryId? : number | null;
}


export type ExpenseInput = Omit<Expense, "id">;

export default Expense;