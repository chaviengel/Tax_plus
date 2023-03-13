const db = require("../models/index");
const Report_submission_dates = db.reports_submission_dates

class ReportsSubmissionDatesController {

    getReportSubmissionDate = async (req, res) => {
        const data=await Report_submission_dates.findAll({ where: { report_type: req.body.reportType, year: req.body.year, month: req.body.month } })
        if (data[0]==undefined)
        {
            let ob={"report_type":req.body.reportType,"month": req.body.month,"year": req.body.year}
            this.addReportSubmissionDate(ob)
            const data=await Report_submission_dates.findAll({ where: { report_type: req.body.reportType, year: req.body.year, month: req.body.month } })
            res.send(data)
        }
        else
            res.send(data[0])
    }
    addReportSubmissionDate = async(reportSubmissionDate) => {
        await Report_submission_dates.create(reportSubmissionDate);
    }
    updateReportSubmissionDate = async (req, res) => {
        await Report_submission_dates.update(req.body, {
            where: { report_submission_date_id: req.params.id }
        })
        res.send("updateReportSubmissionDate")
    }
}
const reportsSubmissionDatesController = new ReportsSubmissionDatesController()
module.exports = reportsSubmissionDatesController


