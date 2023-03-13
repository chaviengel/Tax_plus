const express =require("express");
const correspondencesController=require("../controllers/correspondences.js")

const router = express.Router();



router.get("/:costumer",correspondencesController.getCorrespondenceByCostumerId);
router.post("/worker", correspondencesController.addCorrespondenceByWorker)
router.put("/:id", correspondencesController.updateCorrespondence)
router.delete("/:id", correspondencesController.deleteCorrespondence)


module.exports = router;
