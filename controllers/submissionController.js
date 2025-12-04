const Submission = require("../models/Submission");
const Question = require("../models/Question");
const Exam = require("../models/Exam");

/* ---------------------- SUBMIT EXAM ---------------------- */
exports.submitExam = async (req, res) => {
  try {
    const { examId, answers, studentInfo, autoSubmitted } = req.body;

    const exam = await Exam.findById(examId).populate("questions");
    if (!exam) return res.status(400).json({ ok: false, error: "Invalid exam" });

    let total = 0;
    let outOf = 0;
    const processed = [];

    for (const a of answers) {
      const q = await Question.findById(a.question);
      if (!q) continue;

      const correct = q.correctIndex === a.selectedIndex;
      const marks = correct ? q.marks : 0;

      processed.push({
        question: q._id,
        selectedIndex: a.selectedIndex,
        correct,
        marksObtained: marks,
      });

      total += marks;
      outOf += q.marks;
    }

    const s = await Submission.create({
      examId,
      studentInfo,
      answers: processed,
      totalMarks: total,
      outOf,
      autoSubmitted,
    });

    return res.json({ ok: true, submission: s });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ---------------------- GET SUBMISSIONS FOR EXAM ---------------------- */
exports.getSubmissionsByExam = async (req, res) => {
  try {
    const subs = await Submission.find({ examId: req.params.id }).sort({ submittedAt: -1 });
    return res.json({ ok: true, subs });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ---------------------- GET SINGLE SUBMISSION ---------------------- */
exports.getSubmission = async (req, res) => {
  try {
    const sub = await Submission.findById(req.params.id);
    return res.json({ ok: true, sub });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* ---------------------- DELETE SUBMISSION ---------------------- */
exports.deleteSubmission = async (req, res) => {
  try {
    await Submission.findByIdAndDelete(req.params.id);
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
};
