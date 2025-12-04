const Question = require("../models/Question");

// -----------------------------------------------------
// CREATE MCQ QUESTION
// -----------------------------------------------------
exports.createQuestion = async (req, res) => {
  try {
    const { title, options, correctIndex, marks } = req.body;

    const q = await Question.create({
      title,
      options,
      correctIndex,
      marks,
    });

    res.json({ ok: true, question: q });

  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// -----------------------------------------------------
// GET ALL QUESTIONS
// -----------------------------------------------------
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json({ ok: true, questions });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// -----------------------------------------------------
// DELETE QUESTION  ✔ (Fixes 404 error)
// -----------------------------------------------------
exports.deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const q = await Question.findByIdAndDelete(questionId);

    if (!q) {
      return res.status(404).json({
        ok: false,
        error: "Question not found",
      });
    }

    res.json({
      ok: true,
      message: "Question deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};
