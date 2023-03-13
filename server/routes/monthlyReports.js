const express =require("express");
const monthlyReportsController=require("../controllers/monthlyReports.js")

const router = express.Router();

router.get("/:worker",monthlyReportsController.getMonthlyReports);
router.post("/history/costumer",monthlyReportsController.historyByCostumer);
// /:worker/:costumer_id/:report_subtype
router.post("/history/month",monthlyReportsController.historyByMonth);
// /:worker/:year/:month/:report_subtype
router.post("/queries",monthlyReportsController.queries);
// /:worker/:report_subtype/:field/:value
// router.post("/",monthlyReportsController.addMonthlyReports);
router.put("/:id",monthlyReportsController.updateMonthlyReportById);



module.exports = router;