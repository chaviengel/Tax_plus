const db = require("../models/index");
const Children_year_of_birth= db.childrens_years_of_birth

class ChildrensYearsOfBirthController {
    getYearsOfBirthByCostumer =async(req,res)=>{
        res.send(await Children_year_of_birth.findAll({where:{costumer_personal_details_id:req.params.cotumerPersonalDetailsId}}))
    }
    addYearOfBirth =(req,res)=>{
        Children_year_of_birth.create(req.body); 
        res.send("addYearOfBirth")
    }
    updateYearOfBirthById =async (req,res)=>{
      await Children_year_of_birth.update(req.body, {
            where: { year_of_birth_id: req.params.id }})
            res.send("updateYearOfBirthById")
    }
    deleteYearOfBirthById =async (req,res)=>{
      await Children_year_of_birth.destroy({
            where: { year_of_birth_id: req.params.id }
          })
          res.send("deleteYearOfBirthById")

    }
}
const childrensYearsOfBirthController=new ChildrensYearsOfBirthController()
module.exports=childrensYearsOfBirthController


