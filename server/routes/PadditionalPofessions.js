const express =require("express");
const PadditionalPofessionsController=require("../controllers/PadditionalPofessions")

const router = express.Router();

router.get("/:cotumerPersonalDetailsId",PadditionalPofessionsController.getPesonalProfessionsByCostumer);

router.get("/partner/:cotumerPersonalDetailsId",PadditionalPofessionsController.getPartnerProfessionsByCostumer);

router.post("/",PadditionalPofessionsController.addProfession);
// /:worker/:costumer_id/:report_subtype

router.put("/:id",PadditionalPofessionsController.updateProfessionById);
router.delete("/:id",PadditionalPofessionsController.deleteProfessionById);



module.exports = router;
