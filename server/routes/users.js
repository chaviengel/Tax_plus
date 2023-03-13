const express =require("express");
const usersController=require ("../controllers/users.js")

const router = express.Router();


router.post("/login",usersController.login);
// /:userName/:password
router.put("/logout",usersController.logout);
// /:worker
module.exports = router;
