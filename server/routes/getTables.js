const express =require("express");
const getTablesController=require("../controllers/getTables.js")

const router = express.Router();

router.get("/getClassTypes",getTablesController.getClassTypes);
router.get("/getTaskStatusTypes",getTablesController.getTaskStatusTypes);
router.get("/getBookkeepingTypes",getTablesController.getBookkeepingTypes);
router.get("/getCostumeFileTypes",getTablesController.getCostumeFileTypes);
router.get("/getSsStatusTypes",getTablesController.getSsStatusTypes);
router.get("/getItAssessors",getTablesController.getItAssessors);
router.get("/getVatAssessors",getTablesController.getVatAssessors);
router.get("/getDeductionsAssessors",getTablesController.getDeductionsAssessors);
router.get("/getSsBranches",getTablesController.getSsBranches);
router.get("/getPaymentMethodTypes",getTablesController.getPaymentMethodTypes);
router.get("/getReportFrequencyTypes",getTablesController.getReportFrequencyTypes);
router.get("/getReportTypes",getTablesController.getReportTypes);
router.get("/getCorrespondenceTypes",getTablesController.getCorrespondenceTypes);
router.get("/getFileTypes",getTablesController.getFileTypes);
router.get("/getFileSubtypes",getTablesController.getFileSubtypes);


module.exports = router;

