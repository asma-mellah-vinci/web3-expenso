import { useEffect, useState } from "react";
import type { Category } from "../types/Category";
import { da } from "zod/locales";

const host = import.meta.env.VITE_API_URL || "http://unknown-api-url.com";

const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${host}/api/categories`);

            if(!response.ok){
                console.error("Erreur lors du chargement des catégories");
                return;
            }

            const data : Category[] = await response.json();
            setCategories(data);
        };

        fetchCategories().catch(console.error);

    }, []);

    return {categories}
}

export default useCategories;