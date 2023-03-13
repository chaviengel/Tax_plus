const db = require("../models/index");
const Class_type = db.class_type;
const Correspondence_type = db.correspondence_type;
const Deductions_assessor = db.deductions_assessors;
const File_subtype = db.file_subtype
const File_Type = db.file_type;
const It_assessor = db.it_assessors;
const Payment_method_type = db.payment_method_type;
const Report_frequency_type = db.report_frequency_type;
const Report_subtype = db.report_subtype;
const Report_type = db.report_type;
const Ss_branch = db.ss_branches;
const Task_status_type = db.task_status_type;
const Vat_assessor = db.vat_assessors;
const Bookkeeping_type = db.bookkeeping_type;
const Costumer_file_type = db.costumer_file_type;
const Ss_status_type = db.ss_status_type;


class GetTablesController {
    getClassTypes = async (req,res) => {
        console.log("kkk")
        res.send (await Class_type.findAll())
    }
    getTaskStatusTypes = async (req,res) => {
        res.send (await Task_status_type.findAll())
    }
    getBookkeepingTypes = async (req,res) => {
        res.send (await Bookkeeping_type.findAll())
    }
    getCostumeFileTypes = async (req,res) => {
        res.send (await Costumer_file_type.findAll())
    }
    getSsStatusTypes = async (req,res) => {
        res.send (await Ss_status_type.findAll())
    }
    getItAssessors = async (req,res) => {
        res.send (await It_assessor.findAll())
    }
    getVatAssessors = async (req,res) => {
        res.send (await Vat_assessor.findAll())
    }
    getDeductionsAssessors = async (req,res) => {
        res.send (await Deductions_assessor.findAll())
    }
    getSsBranches = async (req,res) => {
      res.send (await Ss_branch.findAll())
    }
    getPaymentMethodTypes = async (req,res) => {
        res.send (await Payment_method_type.findAll())
    }
    getReportFrequencyTypes = async (req,res) => {
        res.send (await Report_frequency_type.findAll())
    }
    getReportTypes = async (req,res) => {
        res.send (await Report_type.findAll())
    }
    getReportSubtypes = async (req,res) => {
        res.send (await Report_subtype.findAll())
    }
    getCorrespondenceTypes = async (req,res) => {
        res.send (await Correspondence_type.findAll())

    }
    getFileTypes = async (req,res) => {
        res.send (await File_Type.findAll())
    }
    getFileSubtypes = async (req,res) => {
        res.send (await File_subtype.findAll())
    }
}

const getTablesController = new GetTablesController()
module.exports = getTablesController


