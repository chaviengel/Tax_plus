const express =require("express");
const annualReportsController=require("../controllers/annualReports.js")

const router = express.Router();

router.get("/:worker",annualReportsController.getAnnualReports);
router.post("/history/costumer",annualReportsController.historyByCostumer);
// /:worker/:costumer/:report_subtype
router.post("/history/year",annualReportsController.historyByYear);
// /:worker/:year/:report_subtype
router.post("/queries",annualReportsController.queries);
// /:worker/:reportSubtype/:field/:value
// router.post("/",annualReportsController.addAnnualReports);
router.put("/:id",annualReportsController.updateAnnualReportById);



module.exports = router;