const db = require("../models/index");
const Costumer_settings= db.costumers_settings
const costumersController=require("../controllers/costumers");
const costumersBusinessDetailsController=require("../controllers/costumersBusinessDetails.js")

class CostumersSettingsController {
    getAllCostumerSettings =async(req, res)=>{
      res.send(await Costumer_settings.findAll( {
        where: {costumer_id: req.params.costumer},
        // artributes:['report_subtype','report_frequency_type','payment_method_type'],
        include:[
          { model:db.report_subtype,artributes:['description'] } ,
          { model:db.report_frequency_type,artributes:['description'] } ,
          { model:db.payment_method_type,artributes:['description'] } 
        ],
        raw:true
        }))
    }

    
    getCostumerSettingByReportSubtype =async(costumer_id, reportSubtype)=>{
      return await Costumer_settings.findAll({ where: { costumer_id: costumer_id,report_subtypeId: reportSubtype} })
    }
    
    addCostumerSetting =async(req, res)=>{
        let c=req.params.costumer
          let ob={
                      "costumer_id": c,
                      "report_subtypeId": null,
                      "report_frequency_typeId": null,
                      "payment_method_typeId": null
          }
          let businessDetails=await costumersBusinessDetailsController.getBusinessDetails(c)
          let file_type=businessDetails[0].costumer_file_type
          if(file_type==1 || file_type==3)
          {
                    ob.report_subtypeId=6;
                    await Costumer_settings.create(ob)
          }
          let is_advance_iv=businessDetails[0].is_advance_iv
          if (is_advance_iv==1)
          {
            ob.report_subtypeId=5;
            ob.report_frequency_typeId=1
            await Costumer_settings.create(ob)
          }
          ob.report_frequency_typeId=null
          let file_deductions=businessDetails[0].file_number_deductions
          if (file_deductions)
          {
            [7,8,9].forEach(async(subtype)=>
                  {
                      ob.report_subtypeId=subtype;
                      if (subtype==8)
                        ob.report_frequency_typeId=1
                      await Costumer_settings.create(ob)
                  })
          }
        res.send("good!!")
    }


    updateCostumerSettingById =async(req, res)=>{
      await Costumer_settings.update(req.body, {
            where: { costumer_setting_id: req.params.id }})
        res.send("updateCostumerSettingById")
    }
    deleteCostumerSettingById =async(req, res)=>{
      const id=req.params.id;
      await  Costumer_settings.destroy({ where: { costumer_setting_id: id } })

    }
}
const costumersSettingsController=new CostumersSettingsController()
module.exports=costumersSettingsController


