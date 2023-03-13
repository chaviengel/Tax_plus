const express = require("express");
const filesCostumersController = require("../controllers/filesCostumers.js")

const router = express.Router();



router.post("/getFilesCostumer", filesCostumersController.getCostumerFilesByFileSubtype);
// {
//     "costumer":1,
//     "file_subtype" :3
// }
router.get("/:id", filesCostumersController.getFileCostumerById);
router.post("/", filesCostumersController.addFileCostumer)
// {
//     "base64_string":"b",
//      "path":"C:/מסמכים/לקוחות/חוי אנגל",
//     "full_file_name":"image.png",
//     "file_subtype":1,
//      "costumer":1
// }
router.put("/:id", filesCostumersController.updateFileCostumer)
// {
//     "file_costumer_id": 15,
//     "costumer_id": 1,
//     "name": "image_4.png",
//     "file_subtype": 1,
//     "path": "C:/מסמכים/לקוחות/חוי אנגל/image_4.png",
//     "create_date": "2023-03-10"
// }
router.delete("/:id", filesCostumersController.deleteFileOrInvoiceNo)
// {
//      "path":"C:/מסמכים/לקוחות/חוי אנגל/tmp_6.png",
//      "id" :18,
//      "Model":"Invoice_no"
// }
router.get("/getinvoiccesNo/:costumer", filesCostumersController.getInvoicesNo);
router.get("/getInvoiceNoById/:id", filesCostumersController.getInvoiceNoById);
router.post("/invoiceNo", filesCostumersController.addInvoiceNo)
// {
//     "base64_string":"b",
//     "path":"C:/מסמכים/לקוחות/חוי אנגל/חשבוניות מס",
//     "full_file_name":"image.png",
//     "date":"2023-02-02",
//     "payment_type":1,
//     "costumer":1
// }
router.put("/invoiceNo/:id", filesCostumersController.updateInvoiceNo)


module.exports = router;
