const db = require("../models/index");
const Monthly_report = db.monthly_reports;
const Monthly_deduction = db.monthly_deductions;
const Annual_report = db.annual_reports;
const costumersSettingsController = require("../controllers/CostumersSettings");
const costumersController = require("../controllers/costumers");
const costumersBusinessDetailsController = require("../controllers/costumersBusinessDetails.js")


class UpdatesController {
    d = new Date()
    m = this.d.getMonth() + 1
    y = this.d.getFullYear()
    updateMonthlyReports = async (req, res) => {

        let ob = {
            "costumer_id": null,
            "report_subtypeId": null,
            "month": this.m,
            "year": this.y,
        }
        let costumers = await costumersController.getCostumers(1);
        let costumers_id = costumers.map(x => x.costumer_id)
        costumers_id.forEach(async (c) => {
            let businessDetails = await costumersBusinessDetailsController.getBusinessDetails(c)
            let file_type = businessDetails[0].costumer_file_type
            if (file_type == 1 || file_type == 3) {
                let costumersSettings = await costumersSettingsController.getCostumerSettingByReportSubtype(c, 6)
                let frequency = costumersSettings[0].report_frequency_type
                if (frequency == 1 || (this.m) % 2 == 1) {
                    ob.costumer_id = c;
                    ob.report_subtypeId = 6;
                    await Monthly_report.create(ob);
                }
            }
            let is_advance_iv = businessDetails[0].is_advance_iv
            if (is_advance_iv == 1) {
                ob.costumer_id = c;
                ob.report_subtypeId = 5;
                await Monthly_report.create(ob);
            }
        });
        res.send("succeed!!")
    }
    updateMonthlyDeductions = async (req, res) => {
        let ob = {
            "monthly_deduction_id": null,
            "costumer_id": null,
            "report_subtypeId": null,
            "month": this.m,
            "year": this.y,
        }
        let costumers = await costumersController.getCostumers(1);
        let costumers_id = costumers.map(x => x.costumer_id)
        costumers_id.forEach(async (c) => {
            let businessDetails = await costumersBusinessDetailsController.getBusinessDetails(c)
            let file_deductions = businessDetails[0].file_number_deductions
            if (file_deductions != null) {

                let costumersSettings = await costumersSettingsController.getCostumerSettingByReportSubtype(c, 7)
                let frequency = costumersSettings[0].report_frequency_type
                if (frequency == 1 || (this.m) % 2 == 1) {
                    ob.costumer_id = c;
                    ob.report_subtypeId = 7;
                    await Monthly_deduction.create(ob)
                }
                [8, 9, 10].forEach(async (subtype) => {
                    ob.costumer_id = c;
                    ob.report_subtypeId = subtype;
                    await Monthly_deduction.create(ob)
                })
            }
           
        });
        res.send("succceed!")
    } 
    updateAnnualReports = async (req, res) => {
        let ob = {
            "costumer_id": null,
            "report_subtypeId": null,
            "year": this.y,
        }
        let costumers = await costumersController.getCostumers(1);
        let costumers_id = costumers.map(x => x.costumer_id)
        costumers_id.forEach(async (c) => {
            for (let i = 1; i < 4; i++) {
                ob.costumer_id = c;
                ob.report_subtypeId = i;
                await Annual_report.create(ob)
            }
        });
        res.send("succceed!")
    }
}


const updatesController = new UpdatesController()
module.exports = updatesController