import { Router } from "express";
import { getAllUsers } from "../services/users.ts";

const usersRT = Router();

usersRT.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json("INTERNAL ERROR");
    }
});


export default usersRT;