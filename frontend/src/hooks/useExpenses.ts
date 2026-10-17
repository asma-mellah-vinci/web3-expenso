import { useEffect, useState } from "react";
import type { Expense, ExpenseInput } from "../types/Expense";

const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

interface ExpenseFilter {
    amount?: number;
    payerId?: number;
    categoryId? : number;
}

const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // FETCH GET ALL
  const fetchExpenses = async (filter : ExpenseFilter = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if(filter.amount !== undefined){
        params.set("amount", String(filter.amount));
      }

      if(filter.payerId !== undefined){
        params.set("payerId", String(filter.payerId));
      }

      if(filter.categoryId !== undefined){
        params.set("categoryId", String(filter.categoryId));
      }


      const query = params.toString();

      let url;
      if(query !== ""){
        url = `${host}/api/expenses?${query}`
      } else {
        url = `${host}/api/expenses`
      }

      const response = await fetch(url);

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
    fetchExpenses
  };
};

export default useExpenses;
