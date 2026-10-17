import { useState } from "react";
import useUsers from "../hooks/useUsers";
import useCategories from "../hooks/useCategories";


interface ExpenseSearchProps {
    fetchExpenses: (filter? : {amount? : number; payerId? : number; categoryId? : number}) => Promise<void>
}

const ExpenseSearch = ({fetchExpenses} : ExpenseSearchProps) => {
    const [amount,   setAmount]   = useState("");
    const [payerId, setPayerId]   = useState("");
    const [categoryId, setCategoryId] = useState("");

    const { users } = useUsers();
    const { categories } = useCategories();

    const handleSubmit = (e : React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetchExpenses(
            {
                amount  : amount  === "" ? undefined : Number(amount),
                payerId : payerId === "" ? undefined : Number(payerId),
                categoryId : categoryId === "" ? undefined : Number(categoryId)
            }
        );
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Montant minimum :</label>
            <br/>
            <input 
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <br/>
            <label>Payé par :</label>
            <br/>
            <select value={payerId} onChange={(e) => setPayerId(e.target.value)}>
                <option value="">Tous les utilisateurs</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <br/>

            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
            >
                <option value="">Toutes les catégories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <br />
            <br/>
            <button type="submit">Rechercher</button>
        </form>
    );
};

export default ExpenseSearch;