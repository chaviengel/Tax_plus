const express =require("express");
const costumersBusinessDetailsController=require("../controllers/costumersBusinessDetails.js")

const router = express.Router();



router.get("/:costumer",costumersBusinessDetailsController.getBusinessDetailsByCostumerId);
router.post("/",costumersBusinessDetailsController.addBusinessDetails)
router.put("/:id", costumersBusinessDetailsController.updateBusinessDetails)



module.exports = router;
