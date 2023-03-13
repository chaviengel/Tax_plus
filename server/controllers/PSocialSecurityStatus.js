const db = require("../models/index");
const Social_security_ststus= db.social_security_ststus

class SsStatusController {
    getSsStatusByCostumer =async(req,res)=>{
      res.send(await Social_security_ststus.findAll({where:{costumer_business_details_id:req.params.costumerBusinessDetailsId}}))

    }
    addSsStatus =async (req,res)=>{
      await Social_security_ststus.create(req.body);
      res.send("addSsStatus")
    }
    updateSsStatusById =async (req,res)=>{
      await Social_security_ststus.update(req.body, {
            where: { social_security_ststus_id: req.params.id }})
            res.send("updateSsStatusById")
    }
    deleteSsStatusById =async (req,res)=>{
      await Social_security_ststus.destroy({
            where: { social_security_ststus_id: req.params.id }
          })
          res.send("deleteSsStatusById")
    }
}
const ssStatusController=new SsStatusController()
module.exports=ssStatusController


