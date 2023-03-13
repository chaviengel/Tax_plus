const express =require("express");
const workersCostumersController=require("../controllers/workersCostumers")
const router = express.Router();

router.get("/costumer/:costumer",workersCostumersController.getWorkerByCostumer);
router.get("/worker/:worker",workersCostumersController.getCostumersByWorker);
router.post("/",workersCostumersController.addWorkersCostumer)
router.put("/:id", workersCostumersController.updateCostumerById)

module.exports = router;
