import ExpenseAdd from "../components/ExpenseAdd";
import ExpenseItem from "../components/ExpenseItem";
import useExpenses from "../hooks/useExpenses";

const Home = () => {
    const {expenses, loading, error, addExpense, resetExpenses} = useExpenses();

    if(loading){
        return <p>Loading.....</p>
    }

    if(error){
        return <p>Error....</p>
    }


    return (
        <div>
            {expenses.map((expense) => (
                <ExpenseItem expense={expense}/>
            ))}
            <ExpenseAdd addExpense={addExpense} />

            <button onClick={resetExpenses}>RESET DATA</button>
        </div>
    );
};

export default Home