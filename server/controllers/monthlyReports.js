const db = require("../models/index");
const Monthly_report = db.monthly_reports
const general = require("./general")


class MonthlyReportsController {

    getMonthlyReports = async (req, res) => {
        const d = new Date()
        res.send(await general.getReportsByWorker(Monthly_report, req.params.worker, { year: d.getFullYear(), month: d.getMonth() + 1 }))
    }
    historyByCostumer = async (req, res) => {
        res.send(await general.historyByCostumer(Monthly_report, req.body.worker, req.body.costumer, req.body.report_subtype))
    }
    historyByMonth = async (req, res) => {
        res.send(await general.historyByMonthOrYear(Monthly_report,req.body.worker, req.body.month, req.body.year, req.body.report_subtype))
    }
    queries = async (req, res) => {
        res.send(await general.queries(Monthly_report, req.body.worker, req.body.field, req.body.value, req.body.report_subtype,null,true,true))
    }
    addMonthlyReports = async (req, res) => {
        let d = new Date()
        let data = await Monthly_report.findAll({ where: { month: d.getMonth() + 1, year: d.getFullYear() } })
        if (data[0])
            res.send("הדוחות עודבנו כבר בחודש זה")
        else {  }
    }
    updateMonthlyReportById = async (req, res) => {
        await general.updateReportById(Monthly_report,req.body,{ monthly_report_id: req.params.id })
        res.send("updateMonthlyReportById" )
    }
}


const monthlyReportsController = new MonthlyReportsController()
module.exports = monthlyReportsController


