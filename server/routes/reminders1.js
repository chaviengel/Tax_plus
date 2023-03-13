const express =require("express");
const reminders=require('../services/Reminders')
const updates=require('../services/updates')

const router = express.Router();


router.get("/",reminders.sendReminders);
router.get("/1",updates.updateMonthlyReports);
router.get("/2",updates.updateMonthlyDeductions);
router.get("/3",updates.updateAnnualReports);


module.exports = router;
