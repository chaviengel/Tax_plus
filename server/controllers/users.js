const db = require("../models/index");
const jwt = require("jsonwebtoken");
const workersController=require("../controllers/workers.js");
const attendanceController=require("../controllers/attendance.js")
const send = require("send");

class UsersController {

    login =async(req, res)=>{
        let users=await workersController.getWorkers()
        let user=users.filter(u=>u.id==req.body.userName)[0]

        if (!user)
            res.send("the userName is wrong")
        else
            if (user.password!=req.body.password)
                res.send("the password is wrong")
            else
            {
                const accessTokensecret="bussinessToken";
                const accessToken=jwt.sign(
                    {email:user.email, full_name:user.full_name},
                    accessTokensecret
                );
                let ob={
                    "worker_id": user.worker_id,
                    "date": new Date(),
                    "enter_time":new Date().toLocaleTimeString(),
            }
                await attendanceController.addAttendance(ob)
                res.send("you enter to the apliction!!")
            }
    }
    logout =async(req, res)=>{
        let ob={
            "enter_time":null,
            "exit_time":null,
            "total_time":null,
        }
        let a=await attendanceController.getNullAttendance(req.body.worker)
        ob.enter_time=a[0].enter_time
        ob.exit_time=new Date().toLocaleTimeString()
        let hours=ob.exit_time.slice(0,2)-ob.enter_time.slice(0,2)
        let minutes=ob.exit_time.slice(3,5)-ob.enter_time.slice(3,5)
        let goodMinutes=(minutes/60)
        let time=hours+goodMinutes
        ob.total_time=time
        let attendanceId=a[0].attendance_id
        await attendanceController.updateAttendance(ob,attendanceId)
        res.send("updateAttendance")
    }
}

const usersController=new UsersController()
module.exports=usersController

