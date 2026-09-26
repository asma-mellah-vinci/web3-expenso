app.use(
  cors({
    origin: ['http://localhost:5173', /\.onrender\.com$/],
  })
);