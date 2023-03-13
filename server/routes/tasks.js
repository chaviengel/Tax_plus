const express =require("express");
const tasksController=require("../controllers/tasks.js")

const router = express.Router();

router.post("/daily",tasksController.getDailyTasks);
//:worker/:date
router.post("/filter",tasksController.tasksFilter);
// /:worker/:date/:actor/:status
router.post("/", tasksController.addTask)
router.put("/:id", tasksController.updateTask)
router.delete("/:id", tasksController.deleteTask)


module.exports = router;