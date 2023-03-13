const db = require("../models/index");
const workersController = require("../controllers/workers.js")
const Attendance = db.attendance;

class AttendanceController {
    getNotTotalDailyAttendance = async (req, res) => {
        res.send(await Attendance.findAll({
            where: { worker_id: req.body.worker, date: new Date(req.body.date) }
            , include: { model: db.workers, artributes: ["full_name"] }, raw: true
        }))
    }

    getTotalDailyAttendance = async (req, res) => {
        let dailyAttendance = await Attendance.findAll({ where: { worker_id: req.body.worker, date: new Date(req.body.date) } });
        let total = dailyAttendance.map(x => x.total_time)
        let sum = 0;
        total.forEach(t => {
            sum += t;
        });
        res.send(sum.toString());
    }

    getIsJobDay = async (req, res) => {
        const data =await Attendance.findAll({ where: { date: new Date(req.params.date) } })
        if (data[0])
            res.send(true)
        else
            res.send(false)
    }


    getNullAttendance = async (workerId) => {
        return await Attendance.findAll({ where: { worker_id: workerId, exit_time: null } })

    }
    addAttendance = async (attendance) => {
        await Attendance.create(attendance);
    }
    updateAttendance = async (attendance, attendanceId) => {
        await Attendance.update(attendance, {
            where: { attendance_id: attendanceId }
        })
    }
}


const attendanceController = new AttendanceController()
module.exports = attendanceController