import type { ExpenseInput } from "../types/Expense";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCategories from "../hooks/useCategories";

interface ExpenseAddProps {
  addExpense: (expense: ExpenseInput) => void;
}

const expenseSchema = z.object({
  payer : z.enum(["Alice", "Bob"]),
  date  : z.string().min(1, "Date obligatoire"),
  description : z.string().max(200, "Maximum 200 caractères"),
  amount : z.number().positive("Le montant doit etre supérieur à 0"),
  categoryId : z.number().int().positive().optional(),
});

type FormData = z.infer<typeof expenseSchema>;

const ExpenseAdd = ({ addExpense }: ExpenseAddProps) => {
  const {categories} = useCategories();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(expenseSchema),
  });

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
        {errors.payer && <span>{errors.payer.message}</span>}
      </div>
      <div>
        <label>Date :</label>
        <input type="date" {...register("date", { required: true })} />
        {errors.date && <span>{errors.date.message}</span>}
      </div>
      <div>
        <label>Description</label>
        <input type="text" {...register("description")} />
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      <div>
        <label>Amount :</label>
        <input
          type="number"
          {...register("amount", { required: true, valueAsNumber: true })}
        ></input>
        {errors.amount && <span>{errors.amount.message}</span>}
      </div>
      <div>
        <label>Catégorie :</label>
        <select {...register("categoryId", {setValueAs: (value) => value === "" ? undefined : Number(value)})}>
          <option value="">Aucune catégorie</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
          ))}
        </select>
        {errors.categoryId && <span>{errors.categoryId.message}</span>}
      </div>
      <button type="submit">ADD</button>
    </form>
  );
};

export default ExpenseAdd;
