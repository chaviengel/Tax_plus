const express =require("express");
const capitalsDeclarationController=require("../controllers/capitalsDeclaration")

const router = express.Router();

router.get("/:worker",capitalsDeclarationController.getCapitalsDeclaration);
router.post("/history/costumer",capitalsDeclarationController.historyByCostumer);
// /:worker/:costumer
router.post("/history/year",capitalsDeclarationController.historyByCostumer);
// /:worker/:costumer
router.post("/queries",capitalsDeclarationController.queries);
// /:worker/:field/:value
router.post("/",capitalsDeclarationController.addCapitalDeclaration);
router.put("/:id",capitalsDeclarationController.updateCapitalDeclarationById);

module.exports = router;