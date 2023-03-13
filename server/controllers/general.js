const db = require("../models/index");
const{Op}=require('sequelize')

class General {

    getReportsByWorker = async (Model,worker, wh) => {
        let data
        if (worker == 1)
            data = await Model.findAll({
                where: wh,
                include: [
                    { model: db.costumers, artributes: ['costumer_id'] },
                    { model: db.report_subtype, artributes: ['report_subtypeId'] }
                ],
                raw: true,
            })

        else
            data = await Model.findAll({
                where: wh,
                include: [
                    { model: db.workers_costumers, artributes: ['costumer_id'], where: { worker_id: worker } },
                    { model: db.costumers, artributes: ['costumer_id'] },
                    { model: db.report_subtype, artributes: ['report_subtypeId'] }
                ],
                raw: true,
            })

        return data;

    }

    queries = async (Model,worker, field, value, report_subtype,year,isYear,isMonth) => {
        const d=new Date()
        let wh = {}
        if(year)
            wh['year'] = year
        if(isYear)
            wh['year'] = d.getFullYear()
        if(isMonth)
            wh['month'] = d.getMonth()+1
        if(report_subtype)
            wh['report_subtype'] = report_subtype
        if(value)
            wh[field] =  {[Op.not]:null}
        else
            wh[field] =  null
        return await this.getReportsByWorker(Model,worker,wh)
        // if (value == null)
        //     data = data.filter(a => a[field] == null && (report_subtype == null || a['report_subtypeId'] == report_subtype))
        // else
        //     data = data.filter(a => a[field] != null && (report_subtype == null || a['report_subtypeId'] == report_subtype))
    }

    historyByMonthOrYear = async (Model,worker, month, year, report_subtype) => {
        let wh = {}
        if (month)
            wh['month'] = month
        else
            wh['year'] = year
        if (report_subtype)
            wh['report_subtypeId'] = report_subtype
        let data = await this.getReportsByWorker(Model,worker, wh)
        return data
    }

    historyByCostumer = async (Model,worker, costumer, report_subtype) => {
        let wh = {}
        wh['costumer_id'] = costumer
        if (report_subtype)
            wh['report_subtypeId'] = report_subtype
        let data = await this.getReportsByWorker(Model,worker, wh)
        return data
    }
    updateReportById = async (Model,report,wh) => {
        await Model.update(report, {
            where: wh
        })
    }


}
const general = new General();
module.exports = general;
