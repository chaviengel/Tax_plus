const db = require("../models/index");
const fs = require('fs');
const { Op } = require('sequelize');
const File_costumer = db.files_costumers;
const Invoice_no = db.invoices_no;
const uploadFile = require("../services/base64toFile");
const files_costumers = require("../models/files_costumers");
const file_type = require("../models/file_type");


class FilesCostumersController {
    addIdForFileName = async (Model, order, full_file_name, costumer) => {
        console.log(Model)
        let topItem
        await Model.findAll({
            where: { costumer_id: costumer },
            order: [[order, 'DESC']],
            limit: 1,
        })
            .then((result) => {
                if (result.length === 0) {
                    topItem = null;
                } else {
                    topItem = result[0];
                }
            })
            .catch((err) => {
                console.error('Error:', err);
            });
        if (topItem == null) {
            const name = full_file_name.split('.')
            full_file_name = `${name[0]}_1.${name[1]}`
        }
        else {

            const top_item_name = topItem.name.split('.')
            let id = parseInt(top_item_name[0].slice(-1))
            const name = full_file_name.split('.')
            full_file_name = `${name[0]}_${id + 1}.${name[1]}`


        }
        return full_file_name;
    }

    getCostumerFilesByFileSubtype = async (req, res) => {
        res.send(await File_costumer.findAll({ where: { costumer_id: req.body.costumer, file_subtype: req.body.file_subtype } }))
    }
    getFileCostumerById = async (req, res) => {
        res.send(await File_costumer.findAll({ where: { file_costumer_id: req.params.id } }))
    }

    addFileCostumer = async (req, res) => {
        let ob = {
            "costumer_id": req.body.costumer,
            "name": null,
            "file_subtype": req.body.file_subtype,
            "path": null,
            "create_date": new Date()
        }
        const full_file_name = await this.addIdForFileName(File_costumer, 'file_costumer_id', req.body.full_file_name, req.body.costumer)
        ob.name = full_file_name
        ob.path = `${req.body.path}/${ob.name}`
        await File_costumer.create(ob)

        const full_name = full_file_name.split('.')
        const name = full_name[0]
        const type = full_name[1]
        uploadFile(req.body.base64_string, req.body.path, name, type,);
        res.send("addFileCostumer")
    }

    updateFileCostumer = async (req, res) => {
        const ob = await File_costumer.findAll({ where: { file_costumer_id: req.params.id } })
        const name=ob[0].name
        if (name.localeCompare(req.body.name)!=0 ) {
            fs.rename(ob[0].path, req.body.path, function (err) {
                if (err) throw err;
                console.log('File Renamed.');
            });
        }
        await File_costumer.update(req.body, {
            where: { file_costumer_id: req.params.id }
        })
        res.send("updateFileCostumer")
    }
    deleteFileOrInvoiceNo = async (req, res) => {
        const Model = req.body.Model;
        if (Model == 'File_costumer')
            await File_costumer.destroy({ where: { file_costumer_id: req.body.id } })
        else
            await Invoice_no.destroy({ where: { invoice_no_id: req.body.id } })

        const filePath = req.body.path;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });
        res.send("deleteFilesCostumers")
    }
    getInvoicesNo = async (req, res) => {
        res.send(await Invoice_no.findAll({ where: { costumer_id: req.params.costumer } }))
    }
    getInvoiceNoById = async (req, res) => {
        res.send(await Invoice_no.findAll({ where: { invoice_no_id: req.params.id } }))
    }

    addInvoiceNo = async (req, res) => {
        let ob = {
            "costumer_id": req.body.costumer,
            "name": null,
            "payment_date": req.body.date,
            "payment_method_type": req.body.payment_type,
            "path": null
        }
        const full_file_name = await this.addIdForFileName(Invoice_no, 'invoice_no_id', req.body.full_file_name, req.body.costumer)
        ob.name = full_file_name
        ob.path = `${req.body.path}/${ob.name}`
        await Invoice_no.create(ob)

        const full_name = full_file_name.split('.')
        const name = full_name[0]
        const type = full_name[1]
        uploadFile(req.body.base64_string, req.body.path, name, type,);
        res.send("addInvoicesNo")
    }
    updateInvoiceNo = async (req, res) => {
        const ob = await Invoice_no.findAll({ where: {  invoice_no_id: req.params.id } })
        const name=ob[0].name
        if (name.localeCompare(req.body.name)!=0 ) {
            fs.rename(ob[0].path, req.body.path, function (err) {
                if (err) throw err;
                console.log('File Renamed.');
            });
        }
        await Invoice_no.update(req.body, {
            where: { invoice_no_id: req.params.id }
        })
        res.send("updateFileCostumer")
    }
}


const filesCostumersController = new FilesCostumersController()
module.exports = filesCostumersController

