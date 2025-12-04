require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const createDefaultAdmin = require("./utils/createDefaultAdmin");

const app = express();

// ------------------------
// ⭐ FIXED CORS (WORKS ON RAILWAY)
// ------------------------
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mcq-frontend-yourdomain.com", // <-- replace if you deploy frontend
      "*",
    ],
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// ⭐ VERY IMPORTANT FOR RAILWAY
app.options("*", cors());

// ------------------------
// EXTRA CORS HEADERS (CRITICAL)
// ------------------------
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // allow all
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// ------------------------
// CONNECT DB + DEFAULT ADMIN
// ------------------------
connectDB();
createDefaultAdmin();

// ------------------------
// ROUTES
// ------------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/exams", require("./routes/exams"));
app.use("/api/submissions", require("./routes/submissions"));

// test route
app.get("/", (req, res) => res.send("MCQ Exam API running"));

// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
