
import express from "express";
import logger from "morgan";
import router from "./routes/expenses.ts";
import usersRT from "./routes/users.ts";
import cors from "cors";
import categoriesRT from "./routes/categories.ts";

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", /\.onrender\.com$/],
}));

app.use("/api", router);
app.use("/api/users", usersRT);
app.use("/api/categories", categoriesRT);

app.get("/ping", (req, res) => {
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});

export default app;
