import { db } from "../src/prisma/db.ts";



async function getAllCategories() {
    const categories = await db.orm.public.Category.all();
    return categories;
}

async function addCategory(name : string, color: string) {
    const newContegory = await db.orm.public.Category.create({
        name  : name,
        color : color,
    });

    return newContegory;
}

export {getAllCategories, addCategory}