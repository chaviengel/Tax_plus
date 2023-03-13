const express =require("express");
const monthlyDeductionsController=require("../controllers/monthlyDeductions.js")

const router = express.Router();

router.get("/:worker",monthlyDeductionsController.getMonthlyDeductions);
router.post("/history/costumer",monthlyDeductionsController.historyByCostumer);
// /:worker/:costumer/:reportSubtype
router.post("/history/month",monthlyDeductionsController.historyByMonth);
// /:worker/:year/:month/:reportSubtype
router.post("/queries",monthlyDeductionsController.queries);
// /:worker/:reportSubtype/:field/:value
// router.post("/",monthlyDeductionsController.addMonthlyDeductions);
router.put("/:id",monthlyDeductionsController.updateMonthlyDeductionById);

module.exports = router;