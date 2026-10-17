import ExpenseAdd from "../components/ExpenseAdd";
import ExpenseItem from "../components/ExpenseItem";
import ExpenseSearch from "../components/ExpenseSearch";
import useExpenses from "../hooks/useExpenses";

const Home = () => {
    const {expenses, loading, error, addExpense, resetExpenses, fetchExpenses} = useExpenses();

    if(loading){
        return <p>Loading.....</p>
    }

    if(error){
        return <p>Error....</p>
    }


    return (
        <div>
            <p>Rechercher une dépense</p>
            <ExpenseSearch fetchExpenses={fetchExpenses}/>
            <br/>
            <br/>
            {expenses.map((expense) => (
                <ExpenseItem expense={expense}/>
            ))}

            <br/>
            <br/>
            <ExpenseAdd addExpense={addExpense} />

            <br/>
            <button onClick={resetExpenses}>RESET DATA</button>
        </div>
    );
};

export default Home