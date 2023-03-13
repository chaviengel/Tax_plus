const db = require("../models/index");
const Correspondence= db.correspondences


class CorrespondencesController {

  getCorrespondenceByCostumerId =async(req, res)=>{
    res.send(await Correspondence.findAll({ where: { costumer_id: req.params.costumer} 
    ,include:{model:db.correspondence_initiative_type,artributes:["description"]},raw:true}))

  }
    addCorrespondence=async(correspondence)=>{
      await Correspondence.create(req.body);
    }

    addCorrespondenceByWorker =async(req, res)=>{
        await this.addCorrespondence(req.body)
        res.send("addCorrespondence")
    }
    addCorrespondenceByEmail =async(correspondence)=>{
        await this.addCorrespondence(correspondence)
        res.send("addCorrespondenceFromEmail")
    }
    updateCorrespondence =async(req, res)=>{
      await Correspondence.update(req.body, {
            where: { correspondence_id: req.params.id }})
        res.send("updateCorrespondence")
    }
    deleteCorrespondence =async(req, res)=>{
      await Correspondence.destroy({ where: { correspondence_id: id } })
    }
   
}


const correspondencesController=new CorrespondencesController()
module.exports=correspondencesController

