import { Router } from "express";
import { addCategory, getAllCategories } from "../services/categories.ts";
import z from "zod";
import { error } from "console";


const categoriesRT = Router();

const categorySchema = z.object({
    name  : z.string().trim().min(1),
    color : z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});


categoriesRT.get("/", async (_req, res) => {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
});


categoriesRT.post("/", async (req, res) => {
    const result = categorySchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({error : "Données de catégorie invalides"});
    }

    try {
        const category = await addCategory(result.data.name,result.data.color);
        return res.status(201).json(category);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "Impossible de créer la catégorie"});
    }
});


export default categoriesRT;