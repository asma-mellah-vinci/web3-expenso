
import type { Expense } from "../types/Expense";
import useCategories from "../hooks/useCategories";

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const { categories } = useCategories();

  const category = categories.find(
    (c) => c.id === expense.categoryId
  );

  return (
    <div>
      <p>{expense.date}</p>
      <p>{expense.description}</p>
      <p>{expense.payer}</p>
      <p>${expense.amount}</p>

      <p>
        Catégorie : {category ? category.name : "Aucune catégorie"}
      </p>

      {category && (
        <span
          style={{
            display: "inline-block",
            width: "15px",
            height: "15px",
            backgroundColor: category.color,
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export default ExpenseItem;
