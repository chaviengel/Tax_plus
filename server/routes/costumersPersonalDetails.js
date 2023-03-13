const express =require("express");
const costumersPersonalDetailsController=require("../controllers/costumersPersonalDetails.js")

const router = express.Router();



router.get("/:costumerId",costumersPersonalDetailsController.getPersonalDetailsByCostumerId);
router.post("/",costumersPersonalDetailsController.addPersonalDetails)
router.put("/:id", costumersPersonalDetailsController.updatePersonalDetails)



module.exports = router;
