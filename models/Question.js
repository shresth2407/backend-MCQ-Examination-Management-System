const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  title: String,
  options: [String],        // [Option1, Option2, Option3, Option4]
  correctIndex: Number,     // 0,1,2,3
  marks: Number             // e.g. 1 mark or 2 marks
});

module.exports = mongoose.model("Question", QuestionSchema);
