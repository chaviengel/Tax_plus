const express = require("express");
const generalFilesController = require("../controllers/generalFiles.js")

const router = express.Router();

router.get("/:file_subtype", generalFilesController.getGeneralFilesBySubype);
router.get("/id/:id", generalFilesController.getGeneralFileById);
router.post("/", generalFilesController.addGeneralFile)
// {
//     "base64_string":"b",
//     "path":"C:/מסמכים/כללי",
//     "full_file_name":"image.png",
//     "file_subtype":1
// }
router.post("/copy", generalFilesController.addCopyGeneralFile)
// {
//     "path":"C:/מסמכים/כללי",
//     "full_file_name":"tmp.txt",
//     "costumer":1,
//      "file_subtype":8
// }

router.put("/:id", generalFilesController.updateGeneralFile)
router.delete("/", generalFilesController.deleteGeneralFile)
// {
//     "path":"C:/מסמכים/כללי/image.png",
//     "id" :2
// }



module.exports = router;
