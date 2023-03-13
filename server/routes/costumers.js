const express =require("express");
const costumersController=require("../controllers/costumers.js")

const router = express.Router();



router.get("/",costumersController.getAllCostumers);
router.get("/:worker",costumersController.getActiveCostumersByWorker);
router.get("/id/:id",costumersController.getCostumerById);
router.post("/", costumersController.addCostumer)
router.put("/:id", costumersController.updateCostumer)



module.exports = router;