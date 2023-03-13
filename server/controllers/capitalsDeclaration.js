const db = require("../models/index");
const general=require("./general")
const Capital_declaration= db.capitals_declaration;

class CapitalsDeclarationController {
    getCapitalsDeclaration = async (req, res) => {
        res.send(await general.getReportsByWorker(Capital_declaration, req.params.worker, {acceptance_date:null}))
    }
    historyByCostumer = async (req, res) => {
        res.send(await general.historyByCostumer(Capital_declaration, req.body.worker, req.body.costumer, null))
    }
    historyByYear = async (req, res) => {
        res.send(await general.histotyByMonthOrYear(Capital_declaration,req.body.worker,null,req.body.year,req.body.report_subtype))
     }
    queries = async (req, res) => {
        res.send(await general.queries(Capital_declaration, req.body.worker, req.body.field, req.body.value, null,false,false))
    }
    addCapitalDeclaration =async(req, res)=>{
        await Capital_declaration.create(req.body); 
        res.send("addCapitalDeclaration")
    }
    updateCapitalDeclarationById = async (req, res) => {
        await general.updateReportById(Capital_declaration,req.body,{ capital_declaration_id: req.params.id })
        res.send("updateCapitalDeclarationById" )
    }
}
const capitalsDeclarationController=new CapitalsDeclarationController()
module.exports=capitalsDeclarationController


