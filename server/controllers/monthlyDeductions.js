const db = require("../models/index");
const general=require("./general")
const Monthly_deduction= db.monthly_deductions


class MonthlyDeductionsController {

    getMonthlyDeductions= async (req, res) => {
        const d=new Date()
        res.send(await general.getReportsByWorker(Monthly_deduction,req.params.worker,{year:d.getFullYear(),month:d.getMonth()+1}))
    }
    historyByCostumer = async (req, res) => {
        res.send(await general.histotyByCostumer(Monthly_deduction,req.body.worker,req.body.costumer,req.body.report_subtype))
    }
    historyByMonth = async (req, res) => {
       res.send(await general.histotyByMonthOrYear(Monthly_deduction,req.body.worker,req.body.month,req.body.year,req.body.report_subtype))
    }
    queries = async (req, res) => {
        res.send(await general.queries(Monthly_deduction,req.body.worker,req.body.field,req.body.value,req.body.report_subtype,null,true,true))
    }

    addMonthlyDeductions =async (req, res)=>{
        let d=new Date()
        let data=await Monthly_deduction.findAll({where:{month: d.getMonth()+1,year:d.getFullYear()}})
        if (data[0])
            res.send("הניכויים עודכנו כבר בחודש זה")
        else{ }   
    }
    updateMonthlyDeductionById = async (req, res) => {
        await general.updateReportById(Monthly_deduction,req.body,{ monthly_deduction_id: req.params.id })
        res.send("updateMonthlyDeductionById" )
    }

}

const monthlyDeductionsController=new MonthlyDeductionsController()
module.exports=monthlyDeductionsController


