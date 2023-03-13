const db = require("../models/index");
const Additional_profession = db.additional_professions

class AdditionalProfessionsController {
  getPesonalProfessionsByCostumer =async (req,res) => {
    res.send (await Additional_profession.findAll({where:{costumer_personal_details_id: req.params.cotumerPersonalDetailsId,is_personal:1}}))
  }
  getPartnerProfessionsByCostumer =async (req,res) => {
    
    res.send (await Additional_profession.findAll({where:{costumer_personal_details_id: req.params.cotumerPersonalDetailsId,is_personal:0}}))
  }
  addProfession = async (req,res) => {
    await Additional_profession.create(req.body);
    res.send("addProfession")

  }
  updateProfessionById = async (req,res) => {
    await Additional_profession.update(req.body, {
      where: { additional_profession_id: req.params.id }
    })
    res.send("updateProfessionById")

  }
  deleteProfessionById = async (req,res) => {
    await Additional_profession.destroy({
      where: { additional_profession_id: req.params.id }
    })
    res.send("deleteProfessionById")
    
  }
}
const additionalProfessionsController = new AdditionalProfessionsController()
module.exports = additionalProfessionsController


