const db = require("../models/index");
const Contact= db.contacts

class ContactsController {
    getContactsByCostumer =async(req,res)=>{
      res.send(await Contact.findAll({where:{costumer_personal_details_id:req.params.cotumerPersonalDetailsId}}))

    }
    addContact =async (req,res)=>{
      await Contact.create(req.body);
      res.send("addContact")
    }
    updateContactById =async (req,res)=>{
      await Contact.update(req.body, {
            where: { Contact_id: req.params.id }})
            res.send("updateContactById")
    }
    deleteContactById =async  (req,res)=>{
      await Contact.destroy({
            where: { Contact_id: req.params.id }
            
          });
          res.send("deleteContactById")
    }
}
const contactsController=new ContactsController()
module.exports=contactsController


