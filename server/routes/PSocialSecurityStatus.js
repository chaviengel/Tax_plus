

const express =require("express");
const PSocialSecurityStatusController=require("../controllers/PSocialSecurityStatus")

const router = express.Router();

router.get("/:costumerBusinessDetailsId",PSocialSecurityStatusController.getSsStatusByCostumer);



router.post("/",PSocialSecurityStatusController.addSsStatus);


router.put("/:id",PSocialSecurityStatusController.updateSsStatusById);
router.delete("/:id",PSocialSecurityStatusController.deleteSsStatusById);



module.exports = router;