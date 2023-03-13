const express =require("express");
const reportsSubmissionDatesController=require("../controllers/reportsSubmissionDates")
const router = express.Router();

router.post("/get",reportsSubmissionDatesController.getReportSubmissionDate);
// /:reportType/:year/:year
// router.post("/",reportsSubmissionDatesController.addReportSubmissionDate)
router.put("/:id", reportsSubmissionDatesController.updateReportSubmissionDate)

module.exports = router;
