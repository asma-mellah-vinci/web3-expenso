import { db } from './src/prisma/db.ts';


async function main() {

  const alice = await db.orm.public.User.create({
    name  : "Alice",
    email : "alice@example.com"
  });

  const bob = await db.orm.public.User.create({
    name : "Bob",
    email : "bob@example.com"
  });

    await db.orm.public.Expense.createAll([
    {
      date: "2025-01-16",
      description: "Example expense #1 from Alice",
      payerId : alice.id,
      amount: 25.5,
    },
    {
      date: "2025-01-15",
      description: "Example expense #2 from Bob",
      payerId : bob.id,
      amount: 35,
    },
    {
      date: "2025-01-05",
      description: "Example expense #3 from Alice",
      payerId : alice.id,
      amount: 2,
    },
    ]);
}


main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })