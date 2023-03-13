const express =require("express");
const costumersSettingsController=require("../controllers/CostumersSettings")
const router = express.Router();

router.get("/:costumer",costumersSettingsController.getAllCostumerSettings);
///:costumer/:reportSubtype
router.post("/:costumer",costumersSettingsController.addCostumerSetting)
router.put("/:id", costumersSettingsController.updateCostumerSettingById)
router.delete("/:id", costumersSettingsController.deleteCostumerSettingById)

module.exports = router;
