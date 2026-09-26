import type { Expense } from "../types";

interface ExpenseItemProps {
    expense : Expense
}

const ExpenseItem = ({expense} : ExpenseItemProps) => {
    return (
        <div>
            <p>{expense.date}</p>
            <p>{expense.description}</p>
            <p>{expense.payer}</p>
            <p>${expense.amount}</p>
        </div>
    );
};

export default ExpenseItem