const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema(
  {
    title: String,
    durationMinutes: Number,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    startTime: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", ExamSchema);
