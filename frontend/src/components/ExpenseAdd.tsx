import type { Expense } from "../types";

interface ExpenseAddProps {
    addExpense : (expense : Expense) => void;
}

const ExpenseAdd = ({addExpense} : ExpenseAddProps) => {

    const handleAddClick = () => {
        const id = Date.now().toString();

        const newExpense : Expense = {
            id          : id,
            date        : new Date().toISOString(),
            description : `New expense ${id}`,
            payer       : Math.random() < 0.5 ? "Alice" : "Bob",
            amount      : Math.round(Math.random() * 10000) / 100
        };

        addExpense(newExpense);
    }  


    return (
        <div>
            <button onClick={handleAddClick}>ADD</button>
        </div>
    );
};

export default ExpenseAdd