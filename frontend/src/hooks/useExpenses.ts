import { useEffect, useState } from "react";
import type { Expense, ExpenseInput } from "../types/Expense";

const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // FETCH GET ALL
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${host}/api/expenses`);

      if (!response.ok) {
        throw new Error("Error while fetching expenses");
      }

      const data: Expense[] = await response.json();
      setExpenses(data);
    } catch (error) {
      setError("Could not load expenses");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  // FETCH POST EXPENSE
  const addExpense = async (expense: ExpenseInput) => {
    try {
      setError(null);

      const response = await fetch(`${host}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error("Error while adding expense");
      }

      await fetchExpenses();
    } catch (error) {
      setError("Could not add expense");
    }
  };

  // FETCH RESET EXPENSE
  const resetExpenses = async () => {
    try {
      setError(null);

      const response = await fetch(`${host}/api/expenses/reset`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Error while resetting expenses");
      }

      await fetchExpenses();
    } catch (error) {
      setError("Could not reset expenses");
    }
  };

  return {
    expenses,
    loading,
    error,
    addExpense,
    resetExpenses,
  };
};

export default useExpenses;
