const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");

require("dotenv").config();

const { initializeDatabase, db } = require("../database/database");
const auth = require("../middleware/auth");

const app = express();

app.use(cors());
app.use(express.json());

initializeDatabase();

// Routes
app.post("/register", require("../routes/register"));
app.post("/login", require("../routes/login"));
app.get("/expenses", auth, require("../routes/getExpenses"));
app.post("/expenses", auth, require("../routes/addExpense"));
app.delete("/expenses/:id", auth, require("../routes/deleteExpense"));
// etc...

module.exports = serverless(app);
