
const express =require("express");
const PchildrensYearsOfBirthController=require("../controllers/PchildrensYearsOfBirth")

const router = express.Router();

router.get("/:cotumerPersonalDetailsId",PchildrensYearsOfBirthController.getYearsOfBirthByCostumer);



router.post("/",PchildrensYearsOfBirthController.addYearOfBirth);


router.put("/:id",PchildrensYearsOfBirthController.updateYearOfBirthById);
router.delete("/:id",PchildrensYearsOfBirthController.deleteYearOfBirthById);



module.exports = router;