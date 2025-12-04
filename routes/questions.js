const router = require("express").Router();
const { auth, isAdmin } = require("../middleware/auth");

const {
  createQuestion,
  getAllQuestions,
  deleteQuestion
} = require("../controllers/questionController");   // ✔ add deleteQuestion

// CREATE MCQ QUESTION
router.post("/", auth, isAdmin, createQuestion);

// GET ALL QUESTIONS
router.get("/", auth, getAllQuestions);

// DELETE QUESTION  ✔ FIXED
router.delete("/:id", auth, isAdmin, deleteQuestion);

module.exports = router;
