
import { db } from "./src/prisma/db.ts";

const categories = [
    { name: "Alimentation", color: "#FF5733" },
    { name: "Transport", color: "#3498DB" },
    { name: "Loisirs", color: "#2ECC71" },
];

async function populateCategories() {
    const existingCategories = await db.orm.public.Category.all();

    for (const category of categories) {
        const exists = existingCategories.some(
            (existing) => existing.name === category.name
        );

        if (!exists) {
            await db.orm.public.Category.create(category);
            console.log(`Catégorie ajoutée : ${category.name}`);
        } else {
            console.log(`Catégorie déjà existante : ${category.name}`);
        }
    }

    console.log("Peuplement des catégories terminé !");
}

populateCategories().catch(console.error);
