const db = require("../models/index");
const fs = require('fs');
const uploadFile = require("../services/base64toFile");
const filesCostumersController=require("./filesCostumers");
const fill = require("fill-range");
const Costumer_personal_details= db.costumers_personal_details;
const General_file = db.general_files;
const File_costumer = db.files_costumers;




class GeneralFilesController {
    getGeneralFilesBySubype =async (req, res) => {
        res.send(await General_file.findAll({where:{file_subtype:req.params.file_subtype}}))
    }
    getGeneralFileById = async(req, res) => {
        res.send(await General_file.findAll({where:{general_file_id:req.params.id}}))
    }
    addGeneralFile = async(req, res) => {
        let ob={
            "name":req.body.full_file_name,
            "file_subtype":req.body.file_subtype,
            "path":req.body.path,
            "create_date":new Date()
        }
        const full_name=req.body.full_file_name.split('.')
        const name=full_name[0]
        const file_type=full_name[1]
        uploadFile(req.body.base64_string,req.body.path,name,file_type)
        await General_file.create(ob)
        res.send(full_name)
    }
    addCopyGeneralFile = async (req, res) => {
        let ob={
            "costumer_id":req.body.costumer,
            "name":null,
            "file_subtype":req.body.file_subtype,
            "path":null,
            "create_date":new Date()
        }
        const full_name=await filesCostumersController.addIdForFileName(File_costumer,'file_costumer_id',req.body.full_file_name,req.body.costumer)
        ob.name=full_name
        const costumer=await Costumer_personal_details.findAll({where:{costumer_id:req.body.costumer}}) 
        ob.path=costumer[0].path
        const sourceFilePath = `${req.body.path}/${req.body.full_file_name}`;
        const destFilePath =  `${ob.path}/${ob.name}`;

        await File_costumer.create(ob)

            fs.copyFile(sourceFilePath, destFilePath, (err) => {
            if (err) {
                console.error('Error copying file:', err);
            } else {
                console.log('File copied successfully!');
            }
        });
        res.send('addCopyGeneralFile');
    }


    updateGeneralFile = async(req, res) => {
        const ob = await General_file.findAll({ where: {  general_file_id: req.params.id } })
        const name=ob[0].name
        if (name.localeCompare(req.body.name)!=0 ) {
            fs.rename(ob[0].path, req.body.path, function (err) {
                if (err) throw err;
                console.log('File Renamed.');
            });
        }
        await General_file.update(req.body, {
      where: { general_file_id: req.params.id }
    })
    res.send("updateGeneralFile")
    }

    deleteGeneralFile =async (req, res) => {
        await General_file.destroy({ where: { general_file_id: req.body.id }})
        const filePath = req.body.path;

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });
        
        res.send("deleteGeneralFile")
    }

}


const generalFilesController = new GeneralFilesController()
module.exports = generalFilesController

