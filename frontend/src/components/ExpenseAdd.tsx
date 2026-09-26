import type { ExpenseInput } from "../types/Expense";
import { useForm } from "react-hook-form";

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

type FormData = {
  payer: string;
  date: string;
  description: string;
  amount: number;
};

const ExpenseAdd = ({ addExpense }: ExpenseAddProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    addExpense(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Payer :</label>
        <select {...register("payer", { required: true })}>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
        </select>
        {errors.payer && <span>PAYER FIELD IS REQUIRED</span>}
      </div>
      <div>
        <label>Date :</label>
        <input type="date" {...register("date", { required: true })} />
        {errors.date && <span>DATE FIELD IS REQUIRED</span>}
      </div>
      <div>
        <label>Description</label>
        <input type="text" {...register("description", { required: true })} />
        {errors.description && <span>DESCRIPTION FIELD IS REQUIRED</span>}
      </div>
      <div>
        <label>Amount :</label>
        <input
          type="number"
          {...register("amount", { required: true, valueAsNumber: true })}
        ></input>
        {errors.amount && <span>AMOUNT FIELD IS REQUIRED</span>}
      </div>
      <button type="submit">ADD</button>
    </form>
  );
};

export default ExpenseAdd;
