
const express =require("express");
const PContactsController=require("../controllers/PContacts")

const router = express.Router();

router.get("/:cotumerPersonalDetailsId",PContactsController.getContactsByCostumer);



router.post("/",PContactsController.addContact);


router.put("/:id",PContactsController.updateContactById);
router.delete("/:id",PContactsController.deleteContactById);



module.exports = router;