const db = require("../models/index");
const Annual_report = db.annual_reports;
const { forEach } = require("lodash");
const general=require("./general")



class AnnualReportsController {

    getAnnualReports= async (req, res) => {
        res.send(await general.getReportsByWorker(Annual_report,req.params.worker,{year:new Date().getFullYear()}))
    }
    historyByCostumer = async (req, res) => {
        res.send(await general.histotyByCostumer(Annual_report,req.body.worker,req.body.costumer,req.body.report_subtype))
    }
    historyByYear = async (req, res) => {
       res.send(await general.histotyByMonthOrYear(Annual_report,req.body.worker,null,req.body.year,req.body.report_subtype))
    }
    queries = async (req, res) => {
        res.send(await general.queries(Annual_report,req.body.worker,req.body.field,req.body.value,req.body.report_subtype,null,true,false))
    }
    addAnnualReports = async (req, res) => {
        let y = new Date().getFullYear()
        let data = await Annual_report.findAll({ where: { year: y } })
        if (data[0])
            res.send("הדוחות עודכנו כבר בשנה זו")
        else{}
    }
    updateAnnualReportById = async (req, res) => {
        await general.updateReportById(Annual_report,req.body,{ annual_report_id: req.params.id })
        res.send("updateAnnualReportById" )
    }
}


const annualReportsController = new AnnualReportsController()
module.exports = annualReportsController


