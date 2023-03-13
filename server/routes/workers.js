const express =require("express");
const workersController=require("../controllers/workers.js")

const router = express.Router();


router.get("/",workersController.getAllWorkers);
router.get("/:id",workersController.getWorkerById);
router.post("/", workersController.addWorker)
router.put("/:id", workersController.updateWorker)
router.delete("/:id", workersController.deleteWorekr)


module.exports = router;
