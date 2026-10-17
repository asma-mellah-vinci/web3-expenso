import { useEffect, useState } from "react"

interface User {
    id   : number;
    name : string;
}

const host = import.meta.env.VITE_API_URL || "http://localhost:3000";

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${host}/api/users`);

            if(!response.ok){
                throw new Error("Error while fetching users");
            }

            const data : User[] = await response.json();
            setUsers(data);

        } catch (error) {
            console.log("Could not load users", error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return {
        users
    };
}

export default useUsers;