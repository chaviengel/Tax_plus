const express =require("express");
const attendanceController=require("../controllers/attendance.js")

const router = express.Router();

router.get("/:date",attendanceController.getIsJobDay);

router.post("/daily",attendanceController.getNotTotalDailyAttendance);
// /:worker /:date

// אולי מיותר
// router.post("/monthly",attendanceController.getMonthlyAttendance);
// /:worker /:month

router.post("/totalDaily",attendanceController.getTotalDailyAttendance);
// /:worker /:date

router.post("/", attendanceController.addAttendance)
router.put("/:id", attendanceController.updateAttendance)

module.exports = router;