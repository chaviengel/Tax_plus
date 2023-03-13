const db = require("../models/index");
const Costumer_business_details= db.costumers_business_details;



class CostumersBusinessDetailsController {

    getBusinessDetails=async(costumer)=>
    {
      return await Costumer_business_details.findAll({ where: { costumer_id: costumer} ,
        include:[
          { model:db.costumers,artributes:['full_name'] } ,
          { model:db.costumer_file_type,artributes:['description'] } ,
          { model:db.it_assessors,artributes:['description'] } ,
          { model:db.vat_assessors,artributes:['description'] } ,
          { model:db.deductions_assessors,artributes:['description'] } ,
          { model:db.ss_branches,artributes:['description'] } ,
          { model:db.bookkeeping_type,artributes:['description'] } ,
          { model:db.workers,artributes:['full_name'] } 
        ],
        raw:true
      })
    }

    getBusinessDetailsByCostumerId =async(req, res)=>{
      res.send(await this.getBusinessDetails(req.params.costumer))
    }
    
    addBusinessDetails =async(req, res)=>{
      await Costumer_business_details.create(req.body);
        res.send("addBusinessDetails")
    }

    updateBusinessDetails =async(req, res)=>{
        await Costumer_business_details.update(req.body, {
            where: { costumer_businesss_details_id: req.params.id }})
        res.send("updateBusinessDetails")
    }

   
}


const costumersBusinessDetailsController=new CostumersBusinessDetailsController()
module.exports=costumersBusinessDetailsController

