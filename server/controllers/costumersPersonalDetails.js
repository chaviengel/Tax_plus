const db = require("../models/index");
const Costumer_personal_details= db.costumers_personal_details;

class CostumersPersonalDetailsController {
    getPersonalDetailsByCostumerId =async(req, res)=>{
      res.send(await Costumer_personal_details.findAll({ where: { costumer_id: req.params.costumerId} }))
    }
    addPersonalDetails =async(req, res)=>{
      await Costumer_personal_details.create(req.body);
        
        res.send("addPersonalDetails")
    }

    updatePersonalDetails =async(req, res)=>{
        await Costumer_personal_details.update(req.body, {
            where: { cotumer_personal_details_id: req.params.id }})
        res.send("updatePersonalDetails")
    }
}


const costumersPersonalDetailsController=new CostumersPersonalDetailsController()
module.exports=costumersPersonalDetailsController

