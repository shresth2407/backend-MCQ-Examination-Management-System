require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const createDefaultAdmin = require("./utils/createDefaultAdmin");

const app = express();
app.use(cors());
app.use(express.json());

// connect database
connectDB();
createDefaultAdmin();

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/exams", require("./routes/exams"));
app.use("/api/submissions", require("./routes/submissions"));

app.get("/", (req, res) => res.send("MCQ Exam API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
