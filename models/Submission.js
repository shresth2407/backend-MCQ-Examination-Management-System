const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
  studentInfo: {
    name: String,
    contact: String,
    college: String,
  },
  answers: [
    {
      question: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      selectedIndex: Number,
      correct: Boolean,
      marksObtained: Number,
    }
  ],
  totalMarks: Number,
  outOf: Number,
  autoSubmitted: Boolean,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Submission", submissionSchema);
