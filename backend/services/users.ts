import { db } from "../src/prisma/db.ts"



async function getAllUsers() {
    const users = db.orm.public.User.all();
    return users;
}


export {getAllUsers}