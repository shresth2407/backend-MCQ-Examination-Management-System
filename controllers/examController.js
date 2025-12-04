const Exam = require("../models/Exam");
const Submission = require("../models/Submission");

exports.createExam = async (req, res) => {
  try {
    const exam = await Exam.create({ ...req.body, startTime: new Date() });
    return res.status(201).json({ ok: true, exam });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};

exports.getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate("questions");
    return res.json({ ok: true, exams });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};

exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate("questions");
    if (!exam) return res.status(404).json({ ok: false, msg: "Exam not found" });
    return res.json({ ok: true, exam });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};

/* ----------------------------------------------------------
   FIXED getExamSubmissions — now returns submissions properly
---------------------------------------------------------- */
exports.getExamSubmissions = async (req, res) => {
  try {
    const { id } = req.params;  // <-- FIXED PARAM NAME

    const subs = await Submission.find({ examId: id })
      .sort({ submittedAt: -1 });

    return res.json({ ok: true, subs });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    await Submission.deleteMany({ examId: req.params.id });
    return res.json({ ok: true, msg: "Exam deleted" });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: err.message });
  }
};
