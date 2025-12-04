const router = require("express").Router();
const { auth, isExaminerOrAdmin } = require("../middleware/auth");
const examController = require("../controllers/examController");

router.post("/", auth, isExaminerOrAdmin, examController.createExam);
router.get("/", auth, examController.getExams);
router.get("/:id", auth, examController.getExamById);
router.get("/:id/submissions", auth, isExaminerOrAdmin, examController.getExamSubmissions);
router.delete("/:id", auth, isExaminerOrAdmin, examController.deleteExam);

module.exports = router;
