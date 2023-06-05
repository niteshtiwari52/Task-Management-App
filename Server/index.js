const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./database.js");
const cors = require("cors");
// Routes
const taskRoutes = require("./Routes/taskRoute.js");
const { notFound, errorHandler } = require("./middelware/errorMiddleWare.js");

dotenv.config();

const app = express();
connectDb();
app.use(express.json()); //To accept Data
app.use(cors({ origin: "https://task-management-app-client.vercel.app" }));
// app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome To the Task management app",
  });
});
app.use("/api/v1/task", taskRoutes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is Running on PORT: http://localhost:${PORT}`);
});
