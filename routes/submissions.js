const router = require("express").Router();
const submissionController = require("../controllers/submissionController");
const { auth, isExaminerOrAdmin } = require("../middleware/auth");

// ------------------------------------------------------
// SUBMIT EXAM (Student side) — No auth required
// ------------------------------------------------------
router.post("/", submissionController.submitExam);

// ------------------------------------------------------
// GET ALL SUBMISSIONS OF ONE EXAM
// /api/submissions/exam/:id
// ------------------------------------------------------
router.get(
  "/exam/:id",
  auth,
  isExaminerOrAdmin,
  submissionController.getSubmissionsByExam
);

// ------------------------------------------------------
// GET SINGLE SUBMISSION
// ------------------------------------------------------
router.get(
  "/:id",
  auth,
  isExaminerOrAdmin,
  submissionController.getSubmission
);

// ------------------------------------------------------
// DELETE SUBMISSION
// ------------------------------------------------------
router.delete(
  "/:id",
  auth,
  isExaminerOrAdmin,
  submissionController.deleteSubmission
);

module.exports = router;
